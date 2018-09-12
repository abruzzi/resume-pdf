const Fs = require('fs')  
const Path = require('path')  
const Util = require('util')  
const Puppeteer = require('puppeteer')  
const ReadFile = Util.promisify(Fs.readFile)

class Resume {  
  async html() {
    try {
      const file = Path.resolve('resumes/index.result.html')
      const content = await ReadFile(file, 'utf8')

      return content
    } catch (error) {
      throw new Error('Cannot create invoice HTML template.')
    }
  }

  async pdf() {
    const html = await this.html()

    const browser = await Puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(html)
    await page.pdf({path: 'index.pdf', format: 'A4'})
    await browser.close()
  }
}

(async () => {
  const resume = new Resume()
  await resume.pdf()
})();