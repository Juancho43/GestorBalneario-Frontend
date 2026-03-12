export interface ShadowEntity {
  id?: string;
  name: string;
  state : 'active' | 'inactive' | 'maintenance ';
  identifier: string;
  type: string;
  coords: { x: number; y: number };
}
