export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  countryId: string;
  isDefault: boolean;
  createdAt: string;
  country?: Country;
}
