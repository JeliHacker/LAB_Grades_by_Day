var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
    function(data)
    {
        console.log("nice code broski");
        console.log("data", data);
        //console.log(getQuizGrade(data, 0));
        getQuizGrade(data, masterDayCount-1)
        console.log("masterDayCount",masterDayCount-1)
        
        
        makeButtons(data);
        /*
        d3.select("#day1") //an attempt to redraw everything when the day1 button gets clicked
        .on("click", function(d)
           {
            getQuizGrade(data, masterDayCount)
        })
        */
    },
    function(err)
    {
        console.log("this code is not good", err);
    }
)

var masterDayCount = 1;
var dayCounter = 0;
var idCounter = 0;
var penguinCounter = 0;
var yData = d3.range(100);


var getQuiz = function(penguin)
{
    return penguin.quizes[0]
}

var getQuizGrade = function(penguins, index)//index is day
{
    console.log("penguins", penguins)
    console.log("penguin.quizes", penguins[0].quizes)
    
    //an attempt to plot points
    d3.select("svg")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    .attr("r", 5)
    .attr("id", function(d)
        {
        
        return penguinCounter 
        })
    .attr("cy", function(penguin)
        {
            return penguin.quizes[index].grade * 7
        })
    .attr("cx", function(penguin)
         {
            penguinCounter = penguinCounter + 1;
            return penguinCounter * 12
        })
    
    
    //puts out the numbers
    d3.select("body")
    .selectAll("span")
    .data(penguins)
    .enter()
    .append("span")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    
    
    
    
    
    //so far, this is just for information purposes
    return penguins[0].quizes[0].grade;
}




var makeButtons = function(penguins)
{
    d3.select("body")
    .selectAll("input")
    .data(penguins[0].quizes)
    .enter()
    .append("button")
    .attr("type","text")
    .text(function(penguin)
        {
        dayCounter = dayCounter + 1;
        console.log("penguin", penguin);
        return penguin.day
        })
    .attr("id", function(d)
        {
        idCounter = idCounter + 1;
        return "day" + idCounter 
        }
         )
    .on("click", function(penguin)
        {
            console.log("button clicked!");
            console.log("penguins", penguins)
            console.log("penguin", penguin)
            var masterDayCount = masterDayCount + 1;
        
        
            d3.select("svg")
            .remove()

            getQuizGrade(penguins, 3)
        })
    
}





//var yscale = d3.scaleLiner()



var points = yData.map(function(x)
                      {
    return {
        x:x,
    };
})

console.log("works up to this point")

var setup = function(points)
{
    d3.select("svg")
    .attr("width", screen.width)
}

var drawGraph = function(points)
{
    d3.select("svg")
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("x", function(point) {return point.x})
    .attr("y", function(point){return point.y})
    
}








//var points =    //points is the array of all grades on a given day