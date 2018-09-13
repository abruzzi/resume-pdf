const Puppeteer = require('puppeteer')  

class Resume {  
  async pdf() {
    const browser = await Puppeteer.launch()
    const page = await browser.newPage()

    const cssb = [];
    cssb.push('<style>');
    cssb.push('h1 { font-family: "Open Sans"; font-weight: 100; font-size:10px; position:absolute; background-color:#f00; z-index:1000; color:#333; text-align:center; margin-left:64px;}');
    cssb.push('</style>');

    const css = cssb.join('');

    await page.goto(`http://localhost:3000/#/resume/${process.argv[2]}`, {
        waitUntil: 'networkidle2'
    })

    await page.pdf({
      path: 'index.pdf', 
      format: 'A4', 
      displayHeaderFooter: true,
      headerTemplate: css+'',
      footerTemplate: css+'<h1>© 2018 ThoughtWorks, Ltd. Confidential – do not distribute</h1>',
      margin: { 
        top: "40px", 
        bottom: "40px",
        right: "30px",
        left: "30px",
      }
    })
    await browser.close()
  }
}

(async () => {
  const resume = new Resume()
  await resume.pdf()
})();