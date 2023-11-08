class Settings {
  update_token: string;
  contentful_space_id: string;
  contentful_access_token: string;

  constructor() {
    this.update_token = process.env.UPDATE_TOKEN as string;
    this.contentful_space_id = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
    this.contentful_access_token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string;
  }
}

const settings = new Settings();

export default settings;
