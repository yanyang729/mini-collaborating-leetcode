import { OjClientPage } from './app.po';

describe('oj-client App', () => {
  let page: OjClientPage;

  beforeEach(() => {
    page = new OjClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
