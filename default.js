var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
    function(data)
    {
        console.log("nice code broski");
        console.log(data);
        console.log(getQuizGrade(data, 0));
    },
    function(err)
    {
        console.log("this code is very not good", err);
    }
)


var getQuiz = function(penguin)
{
    return penguin.quizes[0]
}

var getQuizGrade = function(penguins, index)//index is day
{
    console.log(penguins)
    console.log("penguin.quizes", penguins[0].quizes)
    
    d3.select("svg")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    .attr("r", 2)
    
    return penguins[0].quizes[0].grade;
    
}





var yscale = d3.scaleLiner()

var xData = d3.range(10);

var points = xData.map(function(x)
                      {
    return {
        x:x,
        y:getQuizGrade(penguin, x)
    };
})

//var points =    //points is the array of all grades on a given day