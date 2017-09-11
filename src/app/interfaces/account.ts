export interface UserAccount {
  username: string;
  password: string;
  about: string;
  fullname: string;
  avatar_url: string;
  dob: string;
  career: string;
  promo_code: string;
  nationality: string;
  physique: Physique;
  gender: string;
  location: string;
  contact: Contact;
  interests: Interests;
  relationships: Relationships;
  lifestyle: Lifestyle;
  health: Health;
  social: Social;
  photos: string[];
}

export interface Social {
  fb: string;
  instagram: string;
}

export interface Health {
  hiv_status: Hivstatus;
  disability: Disability;
}

export interface Disability {
  is_disabled: boolean;
  disability_type: string;
}

export interface Hivstatus {
  status: string;
  last_tested: string;
}

export interface Lifestyle {
  drinks: boolean;
  smokes: boolean;
}

export interface Relationships {
  status: string;
  goal: string;
  family: Family;
}

export interface Family {
  has_kids: boolean;
  no_of_kids: number;
}

export interface Interests {
  sex: string;
  others: string[];
}

export interface Contact {
  email: string;
  mobile: string;
}

export interface Physique {
  height: number;
  weight: number;
  complexion: string;
}