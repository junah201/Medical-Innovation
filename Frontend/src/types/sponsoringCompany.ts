export interface SponsoringCompany {
  id: number;
  name: string;
  filename: string;
  link: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface SponsoringCompanyList {
  total: number;
  items: SponsoringCompany[];
}
