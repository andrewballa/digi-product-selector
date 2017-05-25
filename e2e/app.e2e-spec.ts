import { XbeeSelectorPage } from './app.po';

describe('xbee-selector App', () => {
  let page: XbeeSelectorPage;

  beforeEach(() => {
    page = new XbeeSelectorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
