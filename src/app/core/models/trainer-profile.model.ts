export interface TrainerProfile {
    name: string;
    profileImg: string;        // base64 string or URL
    profileImgName?: string;   // optional image file name
    hobby?: string[];          // if multi-select, otherwise string
    birthdate: string | Date;
    isAdult: boolean;
    dui?: string;
  }
  