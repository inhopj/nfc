const fs = require('fs').promises
const path = require('path')

const filePath = path.join(process.cwd(), 'index.d.ts')

const postBuild = async () => {
  try {
    console.log('---------- POST BUILD ----------')
    const sourceContent = await fs.readFile(filePath, 'utf-8')
    
    const targetPath = path.join(process.cwd(), '/dist/index.d.ts')
    
    await fs.appendFile(targetPath, sourceContent)
    
    console.log('---------- POST BUILD COMPLETED ----------')
    
  } catch (error) {
    console.log('---------- POST BUILD ERROR ----------')
    console.log(error)
  }

}

postBuild()
