import React from 'react';
import io from 'socket.io-client';

import './style.css';

class Board extends React.Component {

    timeout;
    socket;

   

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        this.socket = new WebSocket('wss://'
        + "whiteboard-service-2pmnanshaq-uw.a.run.app"
        + '/ws/whiteboard/'
        + 1);

        this.socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        
        this.socket.addEventListener('message', function(event){
            
            console.log("got message");

            console.log(event.data)

            var root = this;
            var interval = setInterval(function(){
         
                if(root.isDrawing) return;
          
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function() {

                   
                    ctx.drawImage(image, 0, 0);

                    root.isDrawing = false;
                };

               

             
              

                try {
                    var jsonData = JSON.parse(event.data);
                    var messageValue = jsonData.message;
                 
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
          
                image.src = messageValue;

            }, 200)
        })
        

        
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            
            if(root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");

                root.socket.send(JSON.stringify({ event: "canvas-data", data: base64ImageData }));
                console.log("sent data");
            }, 1000) 
        };

   
    }

    render() {
        return (
            <div class="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}

export default Board