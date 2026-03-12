import { Injectable } from '@angular/core';
import fabric from 'fabric';
import {ShadowEntity} from '../model/shadowEntity';

@Injectable({
  providedIn: 'root',
})
export class ShadowMapper {
  // 1. CREAR LA SOMBRA DESDE UN OBJETO DE FABRIC
   createShadowFromFabric(fabricGroup: fabric.Group): ShadowEntity | null {
    if (!fabricGroup || fabricGroup.type !== 'group') return null;

    return {
      state: 'active',
      name: this.setName(fabricGroup._objects[0].type),
      identifier: (fabricGroup._objects[1] as fabric.Text).text,
      coords: {
        x: fabricGroup.left,
        y: fabricGroup.top,
      },
      type: fabricGroup._objects[0].type
    };
  }

   setName(type: string){
     switch (type) {
       case 'rect':
          return 'Carpa';
        case 'circle':
          return 'Sombrilla';
       default:
         return '...'
     }
  }
  // 2. ACTUALIZAR EL LIENZO DESDE LA SOMBRA (Sincronización Inversa)
   syncFabricFromShadow(fabricGroup: fabric.Group, shadowEntity: ShadowEntity) {
    fabricGroup.set({
      left: shadowEntity.coords.x,
      top: shadowEntity.coords.y
    });

    // Actualizamos el texto identificador si fuera necesario
    fabricGroup._objects[1].set('text', shadowEntity.identifier);

    fabricGroup.setCoords(); // Crucial para que Fabric reconozca el nuevo área de clic
  }
}
