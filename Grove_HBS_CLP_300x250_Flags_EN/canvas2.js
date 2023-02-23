var pattern = new Image();
pattern.src = "ph-flag.jpg";
var ph = pattern.height;
    
function animate()
{
   setInterval(drawShape, 100);
}
         
function drawShape()
{
   var canvas = document.getElementById('cvs');
   var ctx = canvas.getContext('2d');
   var w = pattern.width;
   var h = pattern.height;
   ctx.clearRect(0, 0, 500, 500);

   if(ph <= 0)
   {
      ph = h;
   }
   else
   {
      ph -= 20;
   }

   for(var x = 0; x < w; x++)
   {
      // 8 = height of wave, 20 = frequency, 38 = vertical offset
      var y = 4 * Math.sin((x + ph)/35) + 38;
      ctx.drawImage(pattern, x, 0, 1, h, x, y, 1, h);
   }
}