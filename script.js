class Vector2 {
  x = null;
  y = null;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  
  multiply(value) {
    return new Vector2(
      this.x * value,
      this.y * value
    );
  }
}

class Line {
  el = null;
  isVertical = false;
  position = null;
  direction = null;
  distance = null;
  isOutOfScreen = false;
  
  constructor() {
    const el = this.el = document.createElement('div');
    el.classList.add('string');
    
    let numbers = [];
    for(let i=0; i<8; i++) {
      numbers.push(Math.round(Math.random()));
    }
    
    const isVertical = this.isVertical = !!Math.round(Math.random());
    
    el.innerHTML = numbers.join('');
    
    if(this.isVertical) {
      el.innerHTML = numbers.join('\n');  
    }
    
    const position = this.position = new Vector2(
      Math.floor(Math.random() * window.innerWidth),
      Math.floor(Math.random() * window.innerHeight)
    );
    
    el.style.top = `${position.y}px`;
    el.style.left = `${position.x}px`;
    
    const hueRotate = Math.floor(Math.random() * 40);
    
    const distance = this.distance = Math.floor(Math.random() * 5);
    el.style.fontSize = `${(28 - 2*distance)}px`;
    el.style.filter = `blur(${distance}px) hue-rotate(${hueRotate}deg)`;
    el.style.zIndex = `-${distance}`;
    
    const dir = Math.round(Math.random()) == 1 ? -1 : 1;
    
    this.direction = new Vector2(dir, 0);
    if(isVertical) {
      this.direction = new Vector2(0, dir);
    }
    
    el.style.opacity = (Math.floor(Math.random() * 20) + 80) + '';
    
    document.body.append(this.el);
  }
  
  update() {
    this.el.style.top = `${this.position.y}px`;
    this.el.style.left = `${this.position.x}px`;
  }
  
  move(value) {
    const divider = this.distance + 1;
    this.position.add(this.direction.multiply(value / divider));
    
    const width = this.el.getBoundingClientRect().width;
    const x = this.el.getBoundingClientRect().x;
    const height = this.el.getBoundingClientRect().height;
    const y = this.el.getBoundingClientRect().y;
    
    if(
      x+width < 0 || x > window.innerWidth ||
      y+height < 0 || y > window.innerHeight
    ) {
      this.isOutOfScreen = true;
    }
  }
  
  destroy() {
    this.el.remove();
  }
}

// Init:
const windowSquare = window.innerWidth * window.innerHeight;
const quantity = Math.floor(windowSquare / 10000);
const lines = [];
let startTime = 0;

function animate() {
  const deltaTime = Math.floor(performance.now() - startTime) / 1000;
  
  for(let i = 0; i<lines.length; i++) {
    lines[i].move(deltaTime * 24);
    lines[i].update();
    
    if(lines[i].isOutOfScreen) {
      lines[i].destroy();
      lines[i] = new Line();
    }
  }
  
  requestAnimationFrame(animate);
  
  startTime = performance.now();
}

for(let i=0; i<quantity; i++) {
  lines.push(new Line());
}
animate();