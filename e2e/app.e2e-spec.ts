import { CtgsFrontendPage } from './app.po';

describe('ctgs-frontend App', function() {
  let page: CtgsFrontendPage;

  beforeEach(() => {
    page = new CtgsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
