import ColorPoint from './color'

class HeatMap {
  constructor() {
    this.color = [];
    this.color.push(new ColorPoint(0, 0, 1, 0.0))
    this.color.push(new ColorPoint(0, 1, 1, 0.34))
    this.color.push(new ColorPoint(0, 1, 0, 0.5))
    this.color.push(new ColorPoint(1, 1, 0, 0.66))
    this.color.push(new ColorPoint(1, 0, 0, 1.0))
  }

   addColorPoint = (red, green, blue, value) => {
    for (let i = 0; i < this.color.length; i++) {
        if (value < this.color[i].val) {
          this.color.splice(i, 0, new ColorPoint(red, green, blue, value));
          return
        }
    }
    this.color.push(new ColorPoint(red, green, blue, value))
  }
  
  getColorAtValue = (value) => {
    let red = 0
    let green = 0
    let blue =0
    if (this.color.length === 0) return { red: red, green: green, blue: blue };
    
    for (var i = 0; i < this.color.length; i++) {
      let currC = this.color[i]
      if (value < currC.val) {
        let prevC = this.color[Math.max(0, i - 1)]
        let valueDiff = (prevC.val - currC.val)
        let fractBetween = (valueDiff === 0) ? 0 : (value - currC.val) / valueDiff
        red = (prevC.r - currC.r) * fractBetween + currC.r
        green = (prevC.g - currC.g) * fractBetween + currC.g
        blue = (prevC.b - currC.b) * fractBetween + currC.b
        return { red, green, blue }
      }
    }
    red = this.color.slice(-1)[0].r;
    green = this.color.slice(-1)[0].g;
    blue = this.color.slice(-1)[0].b;
    return { red, green, blue}
  }
  

}

export default HeatMap