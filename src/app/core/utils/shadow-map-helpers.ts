import { Injectable } from '@angular/core';
import * as fabric from 'fabric';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
@Injectable({
  providedIn: 'root',
})
export class ShadowMapHelpers {
  /**
   * The minimum zoom level allowed for the canvas.
   */
  private readonly MIN_ZOOM = 0.5;
  /**
   * The maximum zoom level allowed for the canvas.
   */
  private readonly MAX_ZOOM = 20;
    /**
   * Resizes a fabric.js object to a desired height, maintaining its aspect ratio.
   * @param object The fabric.Object to resize.
   * @param desiredHeight The desired height for the object.
   */
  fixSize(object:fabric.Object, desiredHeight:number) {
    if (!object.width) return;
    let number = desiredHeight / object.width;
    object.set({
      scaleX: number,
      scaleY: number
    });
  }
  /**
   * Creates a fabric.js group containing an SVG shape and text.
   * @param type The type of shape to create ('carpa' or 'sombrilla').
   * @param x The initial x-coordinate of the group.
   * @param y The initial y-coordinate of the group.
   * @param textContent The text to display within the group.
   * @param state The state of the shape, which determines its color.
   * @returns A fabric.Group object or undefined if the type is invalid.
   */
  createShape(type: string, x: number, y: number, textContent: string, state:string): fabric.Group | undefined {    let svg: any;
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
    this.fixSize(svg,30)
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

  /**
   * Applies a new zoom level to the canvas, centered on the canvas's center.
   * The zoom level is clamped between MIN_ZOOM and MAX_ZOOM.
   * @param canvas The fabric canvas instance.
   * @param newZoom The desired new zoom level.
   */
  applyZoom(canvas: fabric.Canvas,newZoom: number) {
    // 1. Clamp the zoom level
    const zoom = Math.min(Math.max(newZoom, this.MIN_ZOOM), this.MAX_ZOOM);

    // 2. Zoom to center
    const center = new fabric.Point(
      canvas.getWidth() / 2,
      canvas.getHeight() / 2
    );
    canvas.zoomToPoint(center, zoom);

    // 3. Enforce Coordinate Restrictions
    this.constrainViewport(canvas);

    canvas.requestRenderAll();
  }
  /**
   * Sets the canvas to edit mode, allowing objects to be selected and moved.
   * @param canvas The fabric canvas instance.
   */
  setCanvasToEditMode(canvas: fabric.Canvas){
    canvas.selection = true;
    canvas.forEachObject((obj) => {
      obj.selectable = true;
      obj.evented = true;
      obj.lockMovementX = false;
      obj.lockMovementY = false;
    });
    console.log("Canvas on edit mode");
  }
  /**
   * Sets the canvas to view mode, preventing objects from being selected or moved.
   * @param canvas The fabric canvas instance.
   */
  setCanvasToViewMode(canvas: fabric.Canvas){
    canvas.selection = true;
    canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = true;
      obj.lockMovementX = true;
      obj.lockMovementY = true;
      obj.lockRotation = true;
      obj.lockScalingX = true;
      obj.lockScalingY = true;
    });
    console.log("Canvas on view mode");
  }

  /**
   * Validates if the drop point of a drag event is within the canvas boundaries.
   * @param canvas The canvas element.
   * @param event The drag end event.
   * @returns True if the drop point is inside the canvas, false otherwise.
   */
  validateCanvasBorder(canvas: any, event: CdkDragEnd) {
    const rect = canvas.getBoundingClientRect();
    const x = event.dropPoint.x - rect.left;
    const y = event.dropPoint.y - rect.top;
    return (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height);
  }

  /**
   * Changes the size of the fabric.js canvas.
   * @param canvas The fabric canvas instance to resize.
   * @param newWidth The new width for the canvas.
   * @param newHeight The new height for the canvas.
   */
  changeCanvasSize(canvas: fabric.Canvas,newWidth: number, newHeight: number): void {
    canvas.setDimensions({
      width: newWidth,
      height: newHeight
    });

    canvas.calcOffset();
    canvas.renderAll();
  }
  /**
   * Constrains the canvas viewport to prevent panning into positive coordinates,
   * ensuring the top-left corner of the viewport does not go past the (0,0) origin.
   * @param canvas The fabric canvas instance.
   */
  private constrainViewport(canvas: fabric.Canvas) {
    const vpt = canvas.viewportTransform;
    if (!vpt) return;

    vpt[4] = Math.min(0, vpt[4]); // X displacement
    vpt[5] = Math.min(0, vpt[5]); // Y displacement
  }
  /**
   * Returns a color based on the provided state.
   * @param state The state to get the color for. Can be 'occupied', 'available', or another value.
   * @returns 'red' for 'occupied', 'green' for 'available', and 'blue' for other states.
   */
  private color(state:string){
    if (state === 'occupied'){
      return 'red';
    }else if(state === 'available'){
      return 'green';
    }
    return 'blue';
  }
}
