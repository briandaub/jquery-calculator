function resetCalculator(curValue) { 
    $("#display").val(curValue); 
    $(".function-button").removeClass("pendingFunction"); 
    $("#display").data("isPendingFunction", false); 
    $("#display").data("thePendingFunction", ""); 
    $("#display").data("valueOneLocked", false); 
    $("#display").data("valueTwoLocked", false); 
    $("#display").data("valueOne", curValue); 
    $("#display").data("valueTwo", 0); 
    $("#display").data("fromPrevious", false); 
}

$(function(){
	
	   resetCalculator("0");

				$(".num-button").click(function(){
					   
								if ($("#display").data("fromPrevious") == true) { 

												resetCalculator($(this).text()); 

								} else if (($("#display").data("isPendingFunction") == true) 
																			&& ($("#display").data("valueOneLocked") == false)) {

												$("#display").data("valueOne", $("#display").val()); 
												$("#display").data("valueOneLocked", true); 

												$("#display").val($(this).text()); 
												$("#display").data("valueTwo", $("#display").val()); 
												$("#display").data("valueTwoLocked", true); 

								// Clicking a number AGAIN, after first number locked and already value for second number    
								} else if (($("#display").data("isPendingFunction") == true) 
																			&& ($("#display").data("valueOneLocked") == true)) { 

												var curValue = $("#display").val();
									
												var toAdd = $(this).text(); 

												var newValue = curValue + toAdd; 

												$("#display").val(newValue); 

												$("#display").data("valueTwo", $("#display").val()); 
												$("#display").data("valueTwoLocked", true); 
												
								// Clicking on a number fresh    
								} else { 

												var curValue = $("#display").val(); 
												if (curValue == "0") { 
																curValue = ""; 
												} 

												var toAdd = $(this).text(); 

												var newValue = curValue + toAdd; 

												$("#display").val(newValue); 

								} 
				
				}); 
	
				$(".clear-button").click(function(){ 
								resetCalculator("0"); 
				}); 
      
				$(".function-button").click(function(){ 

								if ($("#display").data("fromPrevious") == true) { 
												resetCalculator($("#display").val()); 
												$("#display").data("valueOneLocked", false); 
												$("#display").data("fromPrevious", false) 
								} 

								// Let it be known that a function has been selected 
								var pendingFunction = $(this).text(); 
								$("#display").data("isPendingFunction", true); 
								$("#display").data("thePendingFunction", pendingFunction); 

								// Visually represent the current function 
								$(".function-button").removeClass("pendingFunction"); 
								$(this).addClass("pendingFunction");
					
				});
	
	   $(".plus-minus").click(function(){
								var inverseValue = parseFloat($("#display").val()) * (-1);
								$("#display").val(inverseValue);
				});
	
	   $(".percent").click(function(){
					   var percentage = parseFloat($("#display").data("valueOne")) * parseFloat($("#display").data("valueTwo")) / 100;
					   $("#display").data("valueTwo", percentage);
					   $("#display").val(percentage);
				});
      
				$(".equals-button").click(function(){ 

								if (($("#display").data("valueOneLocked") == true) && ($("#display").data("valueTwoLocked") == true)) { 

												if ($("#display").data("thePendingFunction") == "+") { 
																var finalValue = parseFloat($("#display").data("valueOne")) +  parseFloat($("#display").data("valueTwo")); 
												} else if ($("#display").data("thePendingFunction") == "-") { 
																var finalValue = parseFloat($("#display").data("valueOne")) - parseFloat($("#display").data("valueTwo")); 
												} else if ($("#display").data("thePendingFunction") == "x") { 
																var finalValue = parseFloat($("#display").data("valueOne")) * parseFloat($("#display").data("valueTwo")); 
												} else if ($("#display").data("thePendingFunction") == "/") { 
																var finalValue = parseFloat($("#display").data("valueOne")) / parseFloat($("#display").data("valueTwo")); 
												} 
									
												if (finalValue % 1 != 0) {
														 var decimalPlaces = finalValue.toString().split(".")[1].length;
															if (decimalPlaces > 6) {
																		finalValue = finalValue.toPrecision(6);
																		$("#display").val(finalValue); 
															}
															else {
																		finalValue = finalValue.toPrecision();
																		$("#display").val(finalValue);
															}
												}
												else {
													  $("#display").val(finalValue);
												}

												$("#display").val(finalValue); 

												resetCalculator(finalValue); 
												$("#display").data("fromPrevious", true); 

								} else { 
												// both numbers are not locked, do nothing. 
								} 
        console.log($("#display").val().length);
				});
	
      
});