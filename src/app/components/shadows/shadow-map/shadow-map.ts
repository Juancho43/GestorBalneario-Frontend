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
   /** Injected helper service for shadow map operations. */
  private helpers = inject(ShadowMapHelpers);
  /** The Fabric.js canvas instance. */
  private canvas!: fabric.Canvas;
  /** Reference to the canvas container element. */
  @ViewChild('canvasContainer') containerRef!: ElementRef<HTMLDivElement>;
  /** Reference to the canvas element. */
  @ViewChild('myCanvas') canvasElement!: ElementRef;
  /** Input to set the initial state of the map ('editing' or 'viewing'). Defaults to 'viewing'. */
  initialState = input<MapState>('viewing');
  /** Required to be input with the array of shadow entities to load on the map. */
  loadedShadows = input.required<ShadowEntity[]>();
  /** Computed signal representing the current state of the map. */
  state = computed<MapState>(()=>this.initialState());
  /** Signal to control the delete mode. */
  deleteMode = signal<boolean>(false);
  /** Emits the currently selected element on the canvas. */
  currentElement= output<any>();
  /** Emits when a new element is added to the map. */
  newElement = output<any>();
  /** Emits when an element on the map is updated. */
  updateElement = output<any>();
  /** Emits when an element is deleted from the map. */
  deletedElement = output<any>();

   /**
   * Sets up an effect that reloads the shadows on the canvas whenever the `loadedShadows` input changes.
   */
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
  @HostListener('window:resize')
  onResize() {
    const newWidth =  window.innerWidth * 0.80;
    const newHeight =  window.innerHeight * 0.70;
    this.helpers.changeCanvasSize(this.canvas,newWidth,newHeight);
  }
  /**
   * Initializes the Fabric.js canvas after the view has been initialized.
   * It sets up the canvas dimensions, loads the initial shadows, and configures event listeners.
   */
  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      hoverCursor : 'pointer',
      backgroundColor: '#f0f0f0',
    });
    this.onResize();
    this.load();
    this.setUp();
  }

  /**
   * Listens for keyboard events to handle object deletion.
   * If the 'Delete' or 'Backspace' key is pressed while in 'editing' state and delete mode is active,
   * it calls the `deleteObject` method.
   * @param event The keyboard event.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.state() === 'editing' && this.deleteMode()) {
        this.deleteObject();
      }
    }
  }
  /**
   * Clears the canvas and loads all shadow entities from the `loadedShadows` input.
   * It iterates through the `loadedShadows` array and prints each shadow on the canvas.
   */
  load() {
    if(this.canvas && this.loadedShadows().length > 0){
      this.canvas.clear();
      this.loadedShadows()?.forEach(shadow => {
        this.printGroupOnCanvas(this.helpers.createShape(shadow.type, shadow.coords.x, shadow.coords.y, shadow.identifier,shadow.state));
      })
    }
  }


  /**
   * Handles the drop event of a shadow entity onto the canvas.
   * Validates if the drop position is within the canvas borders, calculates the
   * coordinates, updates the shadow's position, and emits a `newElement` event.
   * @param event The drop event containing the CDK drag-end event and the shadow entity.
   */
  onShadowDropped(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    if (this.helpers.validateCanvasBorder(this.canvasElement.nativeElement,event.event)) {
      const r = this.canvasElement.nativeElement.getBoundingClientRect();
      const x = event.event.dropPoint.x - r.left;
      const y = event.event.dropPoint.y - r.top;
      event.shadow.coords = {x:x,y:y};
      this.newElement.emit(event);
    }
  }

  /**
   * Deletes the currently active objects from the canvas.
   * It discards the active selection and emits a `deletedElement` event for each deleted object.
   */
  deleteObject(){
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      this.canvas.discardActiveObject();
      activeObjects.forEach((obj) => {
        this.deletedElement.emit(obj);
      });
    }
  }

  /**
   * Sets the canvas state to either 'editing' or 'viewing' mode.
   * It calls the appropriate helper method to configure the canvas based on the current state.
   */
  setMapState() {
    if (this.state() === 'editing') {
      this.helpers.setCanvasToEditMode(this.canvas)
    }
    if(this.state() === 'viewing'){
      this.helpers.setCanvasToViewMode(this.canvas);
    }
  }

  //Button's methods

   /** The increment/decrement value for zoom operations. */
  private readonly ZOOM_STEP = 0.1;

  /**
   * Zooms in on the canvas by the ZOOM_STEP value.
   */
  protected zoomIn() {
    this.helpers.applyZoom(this.canvas,this.canvas.getZoom() + this.ZOOM_STEP);
  }

  /**
   * Zooms out on the canvas by the ZOOM_STEP value.
   */
  protected zoomOut() {
    this.helpers.applyZoom(this.canvas,this.canvas.getZoom() - this.ZOOM_STEP);
  }

  /**
   * Resets the canvas's viewport transform and zoom level to their initial state.
   */
  protected resetView() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.helpers.applyZoom(this.canvas,1);
  }

  /**
   * Toggles the delete mode on and off.
   */
  protected activeDelete() {
    this.deleteMode.update((v) => !v )
  }
  //Set up methods
  /**
   * Initializes all the setup methods for the canvas including zoom, panning,
   * object modification, selection, and alignment. It also sets the initial map state.
   */
  private setUp(){
    this.setUpZoom();
    this.setUpPanning();
    this.setUpMovingShape();
    this.setUpSelectShape();
    this.setMapState();
    this.alignMovedItems()
  }

  /**
   * Sets up keyboard listeners for zoom functionality.
   * Listens for '+' to zoom in and '-' to zoom out.
   */
  private setUpZoom() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === '+') {
        this.zoomIn();
      } else if (e.key === '-') {
        this.zoomOut();
      }
    });
  }

  /**
   * Sets up mouse event listeners for panning the canvas.
   * Allows dragging the canvas when clicking on an empty area.
   */
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

  /**
   * Sets up a listener for when an object on the canvas is modified.
   * Emits an `updateElement` event if the map is in 'editing' state.
   */
  private setUpMovingShape(){
    this.canvas.on('object:modified', (options) => {
      if (options.target && this.state() === 'editing') {
        this.updateElement.emit(options.target);
      }
    })
  }

  /**
   * Sets up a listener for double-clicking on an object.
   * Emits the `currentElement` event with the selected object.
   */
  private setUpSelectShape() {
    this.canvas.on('mouse:dblclick', (options) => {
      if (options.target) {
        this.currentElement.emit(options.target);
      }
    });
  }

  /**
   * Adds a fabric.js group to the canvas and renders it.
   * @param group The fabric.js group to be added to the canvas.
   */
  private printGroupOnCanvas(group: any){
    if(this.canvas){
      this.canvas.add(group);
      this.canvas.renderAll();
    }
  }

  /**
   * Sets up snapping functionality for moving objects.
   * Snaps the object's position to the nearest grid line while moving.
   */
  private alignMovedItems(){
    const gridSize = 50; // Define your unit of measurement

    this.canvas.on('object:moving', function(options) {
      // Snap the top and left coordinates to the nearest multiple of your grid size
      options.target.set({
        left: Math.round(options.target.left / gridSize) * gridSize,
        top: Math.round(options.target.top / gridSize) * gridSize
      });
    })
  }
}
