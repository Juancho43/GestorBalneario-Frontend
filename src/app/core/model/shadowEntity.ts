export interface ShadowEntity {
  id?: string;
  name: string;
  state : 'available' | 'unavailable';
  identifier: string;
  type: 'carpa' | 'sombrilla';
  coords: { x: number; y: number };
}
