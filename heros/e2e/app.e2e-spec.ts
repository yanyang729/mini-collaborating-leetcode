import { HerosPage } from './app.po';

describe('heros App', () => {
  let page: HerosPage;

  beforeEach(() => {
    page = new HerosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
