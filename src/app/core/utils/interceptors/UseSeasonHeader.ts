import {HttpContextToken} from '@angular/common/http';

export const USE_SEASON_HEADER = new HttpContextToken<boolean>(() => false);
