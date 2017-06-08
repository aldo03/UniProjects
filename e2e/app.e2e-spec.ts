import { UniboProjectsPage } from './app.po';

describe('unibo-projects App', () => {
  let page: UniboProjectsPage;

  beforeEach(() => {
    page = new UniboProjectsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
