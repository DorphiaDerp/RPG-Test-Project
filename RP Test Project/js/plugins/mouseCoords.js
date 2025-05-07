{

const TouchInput_onMouseMove = TouchInput._onMouseMove
TouchInput._onMouseMove = function(event) {
    if($gameVariables){
        $gameVariables.setValue(116, Graphics.pageToCanvasX(event.pageX))
        $gameVariables.setValue(117, Graphics.pageToCanvasX(event.pageY))
        }

    TouchInput_onMouseMove.call(this, event)
}

}