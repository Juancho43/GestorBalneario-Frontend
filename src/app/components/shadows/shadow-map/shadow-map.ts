import {
  AfterViewInit,
  Component, effect,
  ElementRef,
  HostListener,
  input,
  linkedSignal, output,
  ViewChild
} from '@angular/core';
import { CdkDragEnd} from '@angular/cdk/drag-drop';
import * as fabric from 'fabric';
import {ShadowEntity} from '../../../core/model/shadowEntity';

export type MapState = 'idle' | 'editing' | 'viewing';
@Component({
  selector: 'app-shadow-map',
  imports: [],
  templateUrl: './shadow-map.html',
  styleUrl: './shadow-map.scss',
})
export class ShadowMap implements AfterViewInit{
  readonly loadedShadows = input<ShadowEntity[]>();
  @ViewChild('myCanvas') canvasElement!: ElementRef;
  initialState = input<MapState>('viewing');
  state = linkedSignal<MapState>(this.initialState);
  currentElement= output<any>();
  loaded = output<any>();
  saved = output<any>();
  newElement = output<any>();
  updateElement = output<any>();
  deletedElement = output<any>();
  private canvas!: fabric.Canvas;

  constructor() {
    effect(() => {
      this.loadedShadows()
      this.load();
    });
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'KeyS') {
      this.save();
      return;
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.state() === 'editing') {
        this.deleteObject();
      }
    }
  }


  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      hoverCursor : 'pointer',
      backgroundColor: '#f0f0f0'
    });
    this.load();
    this.setUp();
    this.setMapState();

  }
  setUp(){
    this.canvas.on('object:modified', (options) => {
      if (options.target) {
        console.log('Objeto modificado:', options.target);
          // this.updateElement.emit(options.target);
      }
    })
    this.canvas.on('mouse:over', (options) => {
      if (options.target) {
        this.currentElement.emit(options.target);
      }
    });
  }
  save() {
    if(this.state() === 'editing') {
      const json = JSON.stringify(this.canvas.toJSON());
      localStorage.setItem('myCanvasState', json);
      this.saved.emit(this.canvas.getObjects());
      console.log("Plano guardado con éxito.");
    }
  }
  load() {
    this.loadedShadows()?.forEach(shadow => {
      console.log('Cargando sombra:', shadow);
      this.createShape(shadow.type, shadow.coords.x, shadow.coords.y, shadow.identifier);
    })
  }
  addShape(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    const canvasNative = this.canvasElement.nativeElement;
    const rect = canvasNative.getBoundingClientRect();
    const x = event.event.dropPoint.x - rect.left;
    const y = event.event.dropPoint.y - rect.top;

    if (x >= 0 && x <= canvasNative.width && y >= 0 && y <= canvasNative.height) {
      const text = prompt('Ingrese un identificador para la sombra:');
      const group = this.createShape(event.shadow.type, x, y, text!);
      this.newElement.emit(group);

    }
  }
  updateShapeText(shadow: ShadowEntity) {
    this.canvas.getObjects().forEach((element) => {
      if (element.left === shadow.coords.x && element.top === shadow.coords.y) {
        const group = element as fabric.Group;
         group.item(1).set({
          text: shadow.identifier
          }
        )
        this.canvas.requestRenderAll();
      }
    })
  }
  private createShape(type: string, x: number, y: number, textContent: string = '...') {
    let shape: fabric.Object;
    let text: fabric.IText;
    switch (type) {
      case 'rect':
        shape = new fabric.Rect({originY:'center', originX:'center', width: 50, height: 50, fill: 'blue'});
        break;
      case 'circle':
        shape = new fabric.Circle({originY:'center', originX:'center', radius: 25, fill: 'green'});
        break;
      default:
        return;

    }
    // Agregamos un ID único para la sincronización futura
    text = new fabric.IText( textContent ,{
      originY:'center',
      originX:'center',
      fontSize: 14,
      fill: 'white',
    });
    let group = new fabric.Group([shape, text], {
      left: x,
      top: y,
      hasControls: true,
      hasBorders: true,
      lockRotation: true
    });
    this.canvas.add(group);
    this.canvas.renderAll();
    return group;
  }

  deleteObject(){
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      this.canvas.discardActiveObject(); // Limpia la selección
      activeObjects.forEach((obj) => {
        this.canvas.remove(obj);
        this.deletedElement.emit(obj);
      });
      this.canvas.renderAll(); // Refresca el lienzo
    }
  }
  public setMapState() {


    switch (this.state()) {
      case 'editing':
        // Modo Edición: Usuario tiene control total

        this.canvas.selection = true;
        this.canvas.forEachObject((obj) => {
          obj.selectable = true;
          obj.evented = true;
          obj.lockMovementX = false;
          obj.lockMovementY = false;
        });
        console.log("Modo Edición: Activo");
        break;

      case 'viewing':
        // Modo Vista: Selección activa pero movimiento bloqueado
        this.canvas.selection = true;
        this.canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = true;
          obj.lockMovementX = true;
          obj.lockMovementY = true;
          obj.lockRotation = true;
          obj.lockScalingX = true;
          obj.lockScalingY = true;
        });
        console.log("Modo Vista: Solo lectura");
        break;

      case 'idle':
        // Modo Idle: Canvas bloqueado totalmente (ahorro de recursos)
        this.canvas.selection = false;
        this.canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false; // Ignora clics y hovers
        });
        this.canvas.discardActiveObject(); // Deselecciona cualquier objeto
        console.log("Modo Idle: Sistema en pausa");
        break;
    }

    }

}
