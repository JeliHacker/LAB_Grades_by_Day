var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
    function(data)
    {
        console.log("nice code broski");
        console.log("data", data);
        console.log(getQuizGrade(data, 0));
    },
    function(err)
    {
        console.log("this code is not good", err);
    }
)


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
    .attr("r", 20)
    .attr("cy", function(penguin)
        {
            for (i = 0; i < 230; i + 10){
                return i + 20;
            }
        })
    
    //puts out the numbers
    d3.select("body")
    .selectAll("p")
    .data(penguins)
    .enter()
    .append("p")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    .attr("r", 2)
    
    
    //make buttons for each day WORK IN PROGRESS
    d3.select("body")
    .selectAll("input")
    .data(penguins)
    .enter()
    .append("button")
    .attr("type","text")
    .text("day")
    .attr("id", function(penguin){return penguin.quizes.day})
    
    
    //so far, this is just for information purposes
    return penguins[0].quizes[0].grade;
}





//var yscale = d3.scaleLiner()

var xData = d3.range(10);

var points = xData.map(function(x)
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