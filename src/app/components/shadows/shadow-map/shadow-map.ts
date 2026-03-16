import {
  AfterViewInit,
  Component, computed,
  effect,
  ElementRef,
  HostListener,
  input,
  linkedSignal,
  output,
  ViewChild
} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
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
  readonly loadedShadows = input.required<ShadowEntity[]>();
  @ViewChild('myCanvas') canvasElement!: ElementRef;
  initialState = input<MapState>('viewing');
  state = computed<MapState>(()=>this.initialState());
  currentElement= output<any>();
  loaded = output<any>();
  saved = output<any>();
  newElement = output<any>();
  updateElement = output<any>();
  deletedElement = output<any>();
  private canvas!: fabric.Canvas;
  constructor() {
      effect(() => {
        this.loadedShadows();
          console.log('efect')
          this.load();
          this.setMapState();
      });
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.state() === 'editing') {
        this.deleteObject();
      }
    }
  }
   ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      hoverCursor : 'pointer',
      backgroundColor: '#f0f0f0',
      height: 750,
      width: 1080,
    });
    this.setUp();

  }
  private setUp(){
    this.setUpZoom();
    this.setUpPanning();
    this.setUpMovingShape();
    this.setUpSelectShape();
    this.setMapState();
  }

  load() {
    if(this.canvas && this.loadedShadows().length > 0){
      this.canvas.clear();
    console.log('sombras', this.loadedShadows());
    this.loadedShadows()?.forEach(shadow => {
      this.printGroupOnCanvas(this.createShape(shadow.type, shadow.coords.x, shadow.coords.y, shadow.identifier));
    })
  }}



  onShadowDropped(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    if (this.validateCanvasBorder(event.event)) {
      const text = prompt('Ingrese un identificador para la sombra:');
      const r = this.canvasElement.nativeElement.getBoundingClientRect();
      const x = event.event.dropPoint.x - r.left;
      const y = event.event.dropPoint.y - r.top;
      const group = this.createShape(event.shadow.type, x, y, text!);
      this.newElement.emit(group);
    }
  }


  private validateCanvasBorder(event: CdkDragEnd){
    const canvasNative = this.canvasElement.nativeElement;
    const rect = canvasNative.getBoundingClientRect();
    const x = event.dropPoint.x - rect.left;
    const y = event.dropPoint.y - rect.top;
    return  (x >= 0 && x <= canvasNative.width && y >= 0 && y <= canvasNative.height)
  }
  /**
   * Creates a new group shape.
   *
   * */
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
    return new fabric.Group([shape, text], {
      left: x,
      top: y,
      hasControls: true,
      hasBorders: true,
      lockRotation: true
    });
  }
  private printGroupOnCanvas(group: any){
    this.canvas.add(group);
    this.canvas.renderAll();
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
  private setUpZoom() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Solo activamos si el canvas está enfocado o el estado es el correcto

      const zoomStep = 0.1; // Incremento fijo
      let zoom = this.canvas.getZoom();

      if (e.key === '+') {
        zoom += zoomStep;
      } else if (e.key === '-') {
        zoom -= zoomStep;
      } else {
        return; // No es ninguna de nuestras teclas
      }

      // Mantener dentro de límites
      zoom = Math.min(Math.max(zoom, 0.5), 20);

      // Zoom al centro del lienzo actual
      const center = new fabric.Point(this.canvas.width! / 2, this.canvas.height! / 2);
      this.canvas.zoomToPoint(center, zoom);

      this.canvas.requestRenderAll();
    });
  }
  private setUpPanning() {
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    this.canvas.on('mouse:down', (opt) => {
      const evt = opt.e as MouseEvent;

      // Si NO hay un objeto bajo el cursor, activamos el panning
      if (!opt.target) {
        isDragging = true;
        this.canvas.selection = false; // Desactivar selección de área
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:move', (opt) => {
      if (isDragging) {
        const evt = opt.e as MouseEvent;
        const vpt = this.canvas.viewportTransform!;

        vpt[4] += evt.clientX - lastPosX;
        vpt[5] += evt.clientY - lastPosY;

        this.canvas.requestRenderAll();

        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:up', () => {
      isDragging = false;
      this.canvas.selection = true; // Reactivar selección
    });
  }
  private setUpMovingShape(){
    this.canvas.on('object:modified', (options) => {
      if (options.target && this.state() === 'editing') {
        this.updateElement.emit(options.target);
      }
    })
  }
  private setUpSelectShape() {
    this.canvas.on('mouse:dblclick', (options) => {
      if (options.target) {
        this.currentElement.emit(options.target);
      }
    });
  }
}
