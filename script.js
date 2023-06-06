const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const w= canvas.width = window.innerWidth
const h = canvas.height = window.innerHeight
const colors =["purple" ,"green" ,"cyan"]

class Rect {
    constructor(x,y, wi , he , s , ctx){
        this.x = x ;
        this.y = y ;
        this.wi = wi ;
        this.he = he;
        this.sx = s
        this.sy = s
        this.color = 0
        this.draw(ctx)
    }
    draw(ctx){
        ctx.fillStyle = "transparent";
        ctx.fillRect(this.x, this.y, this.wi, this.he);
        let img = document.createElement("img")
        img.src="https://media.discordapp.net/attachments/775448139938922540/1110619239645184040/image-removebg-preview.png"
        ctx.drawImage(img,this.x+25 , this.y+20  ,this.wi-50,this.he -40)
    }
    update(){
        if(this.y + 100 >=h || this.y <= 0 ){
            this.sy =-this.sy
            this.color= this.color < 2 ? this.color + 1 : 0
            this.sx+=Math.round(Math.random()*2) -1
      
        }
        if((this.x + 200) >=w || this.x <= 0 ){
            this.sx =-this.sx
            this.color= this.color < 2 ? this.color+1 : 0
            this.sy+=Math.round(Math.random()*(2)) -1
        }
        this.x += this.sx
        this.y += this.sy
        this.draw(ctx)
    }
}

class Circle {
    constructor(x, y ,r ,color='white'){
        this.x = x 
        this.y = y 
        this.r = r 
        this.a = 2 * Math.PI
        this.color = color
        this.draw(ctx)
    }
    draw(ctx){
        ctx.beginPath()
        ctx.strokeStyle= this.color
        ctx.lineWidth="2"
        ctx.arc(this.x , this.y , this.r , 0 , this.a)
        ctx.stroke()
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "40px Arial";
        ctx.fillText("Detector", this.x , this.y );
    }
    detect(x, y){
        let d = Math.sqrt(Math.pow((this.x - x) , 2) + Math.pow((this.y - y) , 2))
        return (d-this.r<= 0)
    }
}

const rect = new Rect(200 , h/2 ,200,100,5,ctx)
const c = new Circle(w/2 , h/2 , 300,ctx )

function letn(){
    requestAnimationFrame(letn)
    ctx.clearRect(0 , 0, w , h)
    rect.update(ctx)
    c.draw(ctx)
    if(c.detect(rect.x, rect.y) || c.detect(rect.x+rect.wi , rect.y) ||c.detect(rect.x, rect.y+rect.he) ||c.detect(rect.x+rect.wi , rect.y+rect.he)){
        c.color ="red"
    }
    else{
        c.color ="black"
    }
}
letn()
