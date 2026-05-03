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

export type MapState = 'editing' | 'viewing';
@Component({
  selector: 'app-shadow-map',
  imports: [],
  templateUrl: './shadow-map.html',
  styleUrl: './shadow-map.scss',
})
export class ShadowMap implements AfterViewInit{
  private helpers = inject(ShadowMapHelpers);
  private canvas!: fabric.Canvas;
  @ViewChild('myCanvas') canvasElement!: ElementRef;
  initialState = input<MapState>('viewing');
  loadedShadows = input.required<ShadowEntity[]>();
  state = computed<MapState>(()=>this.initialState());
  deleteMode = signal<boolean>(false);
  currentElement= output<any>();
  loaded = output<any>();
  saved = output<any>();
  newElement = output<any>();
  updateElement = output<any>();
  deletedElement = output<any>();

  constructor() {
    effect(() => {
      console.log('Loading shadows...')
      this.loadedShadows();
      if(this.canvas){
        this.load();
        this.setMapState();
      }
    });
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.state() === 'editing' && this.deleteMode()) {
        this.deleteObject();
      }
    }
  }

  load() {
    if(this.canvas && this.loadedShadows().length > 0){
      this.canvas.clear();
      this.loadedShadows()?.forEach(shadow => {
        this.printGroupOnCanvas(this.helpers.createShape(shadow.type, shadow.coords.x, shadow.coords.y, shadow.identifier,shadow.state));
      })
    }}

  onShadowDropped(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    if (this.helpers.validateCanvasBorder(this.canvasElement.nativeElement,event.event)) {
      const r = this.canvasElement.nativeElement.getBoundingClientRect();
      const x = event.event.dropPoint.x - r.left;
      const y = event.event.dropPoint.y - r.top;
      event.shadow.coords = {x:x,y:y};
      this.newElement.emit(event);
    }
  }

  deleteObject(){
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      this.canvas.discardActiveObject();
      activeObjects.forEach((obj) => {
        this.deletedElement.emit(obj);
      });
    }
  }

  setMapState() {
    if (this.state() === 'editing') {
      this.helpers.setCanvasToEditMode(this.canvas)
    }
    if(this.state() === 'viewing'){
      this.helpers.setCanvasToViewMode(this.canvas);
    }
  }



  //Button's methods

  private readonly ZOOM_STEP = 0.1;

  protected zoomIn() {
    this.helpers.applyZoom(this.canvas,this.canvas.getZoom() + this.ZOOM_STEP);
  }

  protected zoomOut() {
    this.helpers.applyZoom(this.canvas,this.canvas.getZoom() - this.ZOOM_STEP);
  }

  protected resetView() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.helpers.applyZoom(this.canvas,1);
  }

  protected activeDelete() {
    this.deleteMode.update((v) => !v )
  }
  //Set up methods
  private setUp(){
    this.setUpZoom();
    this.setUpPanning();
    this.setUpMovingShape();
    this.setUpSelectShape();
    this.setMapState();
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
  private printGroupOnCanvas(group: any){
    if(this.canvas){
      this.canvas.add(group);
      this.canvas.renderAll();
    }
  }
}
