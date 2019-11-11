var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
    function(data)
    {
        
        console.log("nice code broski");
        console.log("data", data);
        //console.log(getQuizGrade(data, 0));
        setup(data)
        getQuizGrade(data, masterDayCount-1)
        console.log("masterDayCount",masterDayCount-1)
        
        
        makeButtons(data);
        
        NextDay(data);
        PreviousDay(data);
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
) //END OF PROMISE





var screen = {width:800, height:800}

var setup = function(points)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height",screen.height)
}

var yscale = d3.scaleLinear()
    yscale.domain([0, 10]) //scores min and max
    yscale.range([screen.height, 0]) //

var xScale = d3.scaleLinear()
    xScale.domain([0, 23])
    xScale.range([0, screen.width])
    


var masterDayCount = 1;
var buttonCounter = 0;
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
    //console.log("penguin.quizes", penguins[0].quizes)
    
    //an attempt to plot points
    d3.select("svg")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    .attr("r", 18)
    .attr("id", function(d)
        {
            return penguinCounter 
        })
    .attr("cy", function(penguin)
        {
            return yscale(penguin.quizes[index].grade)
        })
    .attr("cx", function(penguin, i)
        {
            return xScale(i)
        })
    .attr("fill", 
        function(penguin)
        {
            if(penguin.quizes[index].grade < 7){
                return "red"
            }else if(penguin.quizes[index].grade >= 7){
                return "green"
            }
        })
    
    
    //puts out the numbers
    /*
    d3.select("body")
    .selectAll("span")
    .data(penguins)
    .enter()        //DR B can you explain
    .append("span")
    .text(function(penguin){
        return penguin.quizes[index].grade
    })
    */
    
    
    
    
    //so far, this is just for information purposes
    return penguins[0].quizes[0].grade;
}



var globalQuizDay = 0;

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
        buttonCounter = buttonCounter + 1;
        console.log("penguin", penguin);
        console.log("buttonCounter", buttonCounter)
        return penguin.day
        })
    .attr("id", function(d)
        {
        idCounter = idCounter + 1;
        return "day" + idCounter 
        }
         )
    .attr("style", "width: 40px; display: inline; vertical-align: middle; text-align: center;")
    .on("click", function(quiz, index)
        {
            console.log("button clicked!");
            //console.log("penguins", penguins)
            console.log("quiz", quiz)
            globalQuizDay = quiz.day;
            console.log("masterDayCountBefore", masterDayCount)
        
            masterDayCount = quiz.day; 
            console.log("masterDayCountAfter",masterDayCount)
            
            clearInfo("svg *");
        
            console.log("Realindex",index)
            idCounter = index;
            getQuizGrade(penguins, idCounter)
        }) 
}


var NextDay = function(penguins)
{
    d3.select(".next")
    .on("click", function(quiz)
       {
        console.log("clickedNEXT");
        console.log("idcounter", idCounter)
        clearInfo("svg *");
        idCounter = idCounter + 1;
        console.log("NEWidcounter", idCounter)
        if(idCounter > 37)
        {
            alert("Error, choose day below.");   
        }
        else if(idCounter < 0)
        {
            alert("Error, choose day below.")
        }else{
        getQuizGrade(penguins, idCounter)
        }
    })   
}

var PreviousDay = function(penguins)
{
    d3.select(".prev")
    .on("click", function(quiz)
       {
        console.log("clickedprev");
        console.log("idcounter", idCounter)
        clearInfo("svg *");
        idCounter = idCounter - 1;
        console.log("NEWidcounter", idCounter)
        if(idCounter > 37)
        {
            alert("Error, choose day below.");   
        }
        else if(idCounter < 0)
        {
            alert("Error, choose day below.")
        }else{
        getQuizGrade(penguins, idCounter)
        }
    })   
}


var clearInfo = function(clear)
{
    d3.selectAll(clear)
    .remove()
}





/*var points = yData.map(function(x)
    {
    return {
        x:x,
        y:penguin.quizes[index].grade * 7
    };
})*/





console.log("works up to this point")


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


//on click redefine 








//var points =    //points is the array of all grades on a given day