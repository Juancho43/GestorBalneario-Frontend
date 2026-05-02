import {
  AfterViewInit,
  Component, computed,
  effect,
  ElementRef,
  HostListener, inject,
  input,
  output, signal,
  ViewChild
} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import * as fabric from 'fabric';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowMapHelpers} from '../../../core/utils/shadow-map-helpers';
interface MapElement extends fabric.Object {
  _history?: { left: number; top: number };
}
declare module 'fabric' {
  namespace fabric {
    interface Object {
      _history?: { left: number; top: number };
    }
  }
}
export type MapState = 'idle' | 'editing' | 'viewing';
@Component({
  selector: 'app-shadow-map',
  imports: [
  ],
  templateUrl: './shadow-map.html',
  styleUrl: './shadow-map.scss',
})
export class ShadowMap implements AfterViewInit{
  readonly loadedShadows = input.required<ShadowEntity[]>();
  private helpers = inject(ShadowMapHelpers);
  @ViewChild('myCanvas') canvasElement!: ElementRef;
  initialState = input<MapState>('viewing');
  state = computed<MapState>(()=>this.initialState());
  currentElement= output<any>();
  loaded = output<any>();
  saved = output<any>();
  newElement = output<any>();
  updateElement = output<any>();
  deletedElement = output<any>();
  deleteMode = signal<boolean>(false);
  private canvas!: fabric.Canvas;
  constructor() {
      effect(() => {
        console.log('cambiarion las sombras')
        this.loadedShadows();
        if(this.canvas){

          this.load();
          this.setMapState();
        }
      });
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.state() === 'editing' && this.deleteMode()) {
        this.deleteObject();
      }
    }
  }
   ngAfterViewInit() {
    const container = this.canvasElement.nativeElement.parentElement;
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      hoverCursor : 'pointer',
      backgroundColor: '#f0f0f0',
      width: container.clientWidth,
      height: container.clientHeight || 600,
    });
     this.load();
     this.setUp();
  }
  private setUp(){
    this.setUpZoom();
    this.setUpPanning();
    this.setUpMovingShape();
    this.setUpSelectShape();
    this.setMapState();
    this.setupInteractionRules()
  }

  load() {
    if(this.canvas && this.loadedShadows().length > 0){
      this.canvas.clear();
      this.loadedShadows()?.forEach(shadow => {
        this.printGroupOnCanvas(this.createShape(shadow.type, shadow.coords.x, shadow.coords.y, shadow.identifier,shadow.state));
      })
    }}



  onShadowDropped(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    if (this.validateCanvasBorder(event.event)) {
      const r = this.canvasElement.nativeElement.getBoundingClientRect();
      const x = event.event.dropPoint.x - r.left;
      const y = event.event.dropPoint.y - r.top;
      event.shadow.coords = {x:x,y:y};
      this.newElement.emit(event);
    }
  }


  private validateCanvasBorder(event: CdkDragEnd){
    const canvasNative = this.canvasElement.nativeElement;
    const rect = canvasNative.getBoundingClientRect();
    const x = event.dropPoint.x - rect.left;
    const y = event.dropPoint.y - rect.top;
    return  (x >= 0 && x <= canvasNative.width && y >= 0 && y <= canvasNative.height)
  }
  private color(state:string){
    if (state === 'occupied'){
      return 'red';
    }else if(state === 'available'){
      return 'green';
    }
    return 'blue';
  }
  /**
   * Creates a new group shape.
   *
   * */
  private createShape(type: string, x: number, y: number, textContent: string, state:string) {
    let svg: any;
    let text: fabric.IText;
    switch (type) {
      case 'carpa':
        const svgString = 'M11.4187 3.18627C11.7664 2.93791 12.2335 2.93791 12.5812 3.18627L19.2081 7.91974C19.6819 8.25817 19.9847 8.78627 20.0374 9.36613L20.8967 18.8189C21.0032 19.9902 20.081 21 18.9049 21H13H11H5.09501C3.91895 21 2.99675 19.9902 3.10323 18.8189L3.96257 9.36613C4.01528 8.78627 4.31808 8.25817 4.79188 7.91974L11.4187 3.18627ZM12 5.2289L5.95436 9.5472L5.09501 19L9.99998 19V13C9.99998 12.4477 10.4477 12 11 12H13C13.5523 12 14 12.4477 14 13V19L18.9049 19L18.0456 9.54721L12 5.2289Z';

       svg = new fabric.Path(svgString);
        svg.set({
          fill: this.color(state),
          stroke: 'black',
          opacity: 0.5,
        });
        break;
      case 'sombrilla':
        const path = 'M184.318,490l78.378-298.026l219.785,55.75C479.394,136.656,403.588,36.542,290.56,7.871\n' +
          '\t\tC269.568,2.546,248.528,0,227.828,0C137.076,0,52.837,48.94,7.518,127.247l225.504,57.201L154.71,482.224L184.318,490z\n' +
          '\t\t M281.458,48.669c47.047,10.959,57,87.53,57.087,130.949l-175.724-44.573C185.817,101.158,238.379,38.797,281.458,48.669z\n' +
          '\t\t M446.781,207.073l-77.738-19.719c0.454-23.708-1.134-82.068-24.771-123.995C396.138,95.076,433.609,147.104,446.781,207.073z\n' +
          '\t\t M224.543,30.671c-48.219,26.944-86.082,85.152-93.098,96.415l-73.183-18.563C99.694,60.524,160.249,31.626,224.543,30.671z'
        svg = new fabric.Path(path);
        svg.set({
          fill: this.color(state),
          stroke: 'black',
          opacity: 0.5,
          left: 10,
          top: 10,
        });
        break;
      default:
        return;

    }
    this.igualarTamaño(svg,30)
    // Agregamos un ID único para la sincronización futura
    text = new fabric.IText( textContent ,{
      fontSize: 20,
      top: 40,
      left: 15,
      fill: 'black',
    });
    return new fabric.Group([svg, text], {
      left: x,
      top: y,
      hasControls: true,
      hasBorders: true,
      lockRotation: true
    });
  }
  igualarTamaño(objeto:fabric.Object, anchoDeseado:number) {
    var escalaNecesaria = anchoDeseado / objeto.width;
    objeto.set({
      scaleX: escalaNecesaria,
      scaleY: escalaNecesaria
    });
  }
  private printGroupOnCanvas(group: any){
    if(this.canvas){
      this.canvas.add(group);
      this.canvas.renderAll();
    }
  }

  deleteObject(){
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      this.canvas.discardActiveObject(); // Limpia la selección
      activeObjects.forEach((obj) => {
        this.deletedElement.emit(obj);
      });
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
      if (e.key === '+') {
        this.zoomIn();
      } else if (e.key === '-') {
        this.zoomOut();
      }
    });
  }
  private setUpPanning() {
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    this.canvas.on('mouse:down', (opt) => {
      const evt = opt.e as MouseEvent;
      if (!opt.target) {
        isDragging = true;
        this.canvas.selection = false;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:move', (opt) => {
      if (isDragging) {
        const evt = opt.e as MouseEvent;
        const vpt = this.canvas.viewportTransform!;

        // Calculamos el nuevo desplazamiento propuesto
        let newX = vpt[4] + (evt.clientX - lastPosX);
        let newY = vpt[5] + (evt.clientY - lastPosY);

        /**
         * LÓGICA DE RESTRICCIÓN:
         * Math.min(0, valor) asegura que el desplazamiento nunca sea mayor a 0.
         * Si intentas mover el canvas a la derecha (positivo), se clava en 0.
         */
        vpt[4] = Math.min(0, newX);
        vpt[5] = Math.min(0, newY);

        this.canvas.requestRenderAll();

        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:up', () => {
      isDragging = false;
      this.canvas.selection = true;
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
// Constants for consistent discipline
  private readonly ZOOM_STEP = 0.1;
  private readonly MIN_ZOOM = 0.5;
  private readonly MAX_ZOOM = 20;

  /**
   * The core engine for all zoom operations
   */
  private applyZoom(newZoom: number) {
    // 1. Clamp the zoom level
    const zoom = Math.min(Math.max(newZoom, this.MIN_ZOOM), this.MAX_ZOOM);

    // 2. Zoom to center
    const center = new fabric.Point(
      this.canvas.getWidth() / 2,
      this.canvas.getHeight() / 2
    );
    this.canvas.zoomToPoint(center, zoom);

    // 3. Enforce Coordinate Restrictions
    this.constrainViewport();

    this.canvas.requestRenderAll();
  }

  /**
   * Keeps the world within positive boundaries
   */
  private constrainViewport() {
    const vpt = this.canvas.viewportTransform;
    if (!vpt) return;

    vpt[4] = Math.min(0, vpt[4]); // X displacement
    vpt[5] = Math.min(0, vpt[5]); // Y displacement
  }
  protected zoomIn() {
    this.applyZoom(this.canvas.getZoom() + this.ZOOM_STEP);
  }

  protected zoomOut() {
    this.applyZoom(this.canvas.getZoom() - this.ZOOM_STEP);
  }

  protected resetView() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.applyZoom(1);
  }
  protected activeDelete() {
    this.deleteMode.update((v) => !v )
  }

  private setupInteractionRules() {
    this.canvas.on('object:modified', (options) => {
      // Cast the target to your MapElement interface
      const movedObj = options.target as MapElement;
      if (!movedObj) return;

      this.snapToGrid(movedObj);

      const isOccupied = this.canvas.getObjects().some(otherObj => {
        const other = otherObj as MapElement;
        if (other === movedObj) return false;
        return other.left === movedObj.left && other.top === movedObj.top;
      });

      if (isOccupied) {
        // TypeScript now understands _history!
        movedObj.set({
          left: movedObj._history?.left ?? 0,
          top: movedObj._history?.top ?? 0
        });
      } else {
        movedObj._history = { left: movedObj.left!, top: movedObj.top! };
      }

      this.canvas.requestRenderAll();
    });
  }
  private readonly TILE_SIZE = 50; // Define your territory size

  /**
   * Force an object to align with the grid discipline
   */
  private snapToGrid(obj: fabric.Object) {
    obj.set({
      left: Math.round(obj.left! / this.TILE_SIZE) * this.TILE_SIZE,
      top: Math.round(obj.top! / this.TILE_SIZE) * this.TILE_SIZE
    });
  }

}
