
$(function(){
});

var score = 0;
var allHap = new Array();  //모든 합의 조합
var usingNum = new Array(); //사용한 숫자
var imageCards = new Array(); //card1부터 27까지 이미지배열 만들기    
imageCards[1] = [111, 'image/card1.png'];
imageCards[2] = [112, 'image/card2.png'];
imageCards[3] = [113, 'image/card3.png'];
imageCards[4] = [121, 'image/card4.png'];
imageCards[5] = [122, 'image/card5.png'];
imageCards[6] = [123, 'image/card6.png'];
imageCards[7] = [131, 'image/card7.png'];
imageCards[8] = [132, 'image/card8.png'];
imageCards[9] = [133, 'image/card9.png'];
imageCards[10] = [211, 'image/card10.png'];
imageCards[11] = [212, 'image/card11.png'];
imageCards[12] = [213, 'image/card12.png'];
imageCards[13] = [221, 'image/card13.png'];
imageCards[14] = [222, 'image/card14.png'];
imageCards[15] = [223, 'image/card15.png'];
imageCards[16] = [231, 'image/card16.png'];
imageCards[17] = [232, 'image/card17.png'];
imageCards[18] = [233, 'image/card18.png'];
imageCards[19] = [311, 'image/card19.png'];
imageCards[20] = [312, 'image/card20.png'];
imageCards[21] = [313, 'image/card21.png'];
imageCards[22] = [321, 'image/card22.png'];
imageCards[23] = [322, 'image/card23.png'];
imageCards[24] = [323, 'image/card24.png'];
imageCards[25] = [331, 'image/card25.png'];
imageCards[26] = [332, 'image/card26.png'];
imageCards[27] = [333, 'image/card27.png'];


    
function showImage(){    // 타일 9개 랜덤으로 이미지 부여하는 함수. 중복으로 나오는 거는 제거함
    usingNum = [];    // 새로운 게임이 시작되면 기존 사용한 넘버는 없애줌
    var objImg; // objImg 라는 변수 선언(타일 아이디 받는데 쓰임)
    for(var h = 1; h < 10; h += 1){ // 랜덤한 숫자 뽑기
        var imgNum = 1 + (Math.round(Math.random()*26));
        while(usingNum.indexOf(imgNum)!=-1){ // 중복 되는 거면 다시 선택
            var imgNum = 1 + (Math.round(Math.random()*26));
            
        }
        usingNum.push(imgNum);//사용한 카드는 배열에 추가
        objImg = document.getElementById("tile" + h); // objImg라는 배열에 0칸부터 8칸까지 타일 아이디와 연동시키기
        objImg.style.backgroundImage = "url(" + imageCards[imgNum][1] + ")"; //연동시킨 곳에 랜덤한 카드 넣기
        

        
    }
    
    allHap = []; //합의 모든 배열 구하기
    for(var i = 0; i < 9; i = i + 1){   //중복 방지
        for(var j = i + 1; j < 9; j = j + 1){
            for(var k = j + 1; k < 9; k = k + 1){

                var ijk = new Array(); 
                ijk.push(i, j, k); //순서 정리
                ijk.sort();

                var cardSum = imageCards[usingNum[i]][0] + imageCards[usingNum[j]][0] + imageCards[usingNum[k]][0]; // 합 판별 알고리즘. 3개가 모두 3의 배수이면 만족
                var cardSumHun = Math.floor(cardSum / 100);
                var cardSumTen = Math.floor((cardSum % 100)/10);
                var cardSumOne = Math.floor((cardSum % 10));

                var judge = (cardSumHun == 3 || cardSumHun ==6 || cardSumHun == 9) && (cardSumTen ==3 || cardSumTen == 6 || cardSumTen ==9) && (cardSumOne == 3 || cardSumOne ==6 || cardSumOne ==9 );
                
                if(judge === true){
                    if(i!=j && j!= k && k!=i){ //i, j, k가 중복이 아닐때
                        allHap.push(ijk);
                    }
                }
            }
        }
    }
}

function scoreTime(){  // 스코어 출력하게 하는 역할, 제한 시간 표시하게 하는 역할
    setTimeout(function(){
        alert("당신의 점수는"+score+"점입니다");
        location.reload();
    },100000);

    var gameTime= 100000;
    setInterval(function(){
        gameTime -= 1000;
        document.getElementById("gTime").innerHTML= "남은시간 : " + gameTime/1000;},1000);

    }


    
var linkNum = new Array(); // 버튼 입력 3개 받는 배열
var usingHap = new Array(); // 중복 입력 방지하기 위해 만든 배열. linknum 저장
var tt = 0;  // 합을 맞춘 횟수


$(function(){       
    var $buttons = $("button");
    $buttons.click(function(){  //버튼 속성을 클릭시
        var $gScore = $("#gscore");  //스코어가 출력되는 html 클래스 참조
          //클릭한 버튼의 밸류값을 저장하는 변수
        newVal = Number(newVal); //밸류값은 숫자형
        
        linkNum.unshift(newVal); 
        linkNum.sort();

        if(linkNum.length === 3){
            if(JSON.stringify(allHap).includes(JSON.stringify(linkNum))){ // 모든 합을 저장하는 배열에 입력된 배열이 있는지 검사
                if(JSON.stringify(usingHap).includes(JSON.stringify(linkNum))){  //만약 이미 입력된 배열이라면 점수 마이너스
                    score -=100;
                    linkNum = [];
                }
                else{
                score += 100;
                usingHap.push(linkNum);
                linkNum = [];
                tt += 1;
                
                }
            }
            else{ 
                score -= 100;
                linkNum = [];
            }
        var $gScore = $("#gscore");
        $gScore.val(score);     //score가 올라가고 나서 반영하기
            
    


        }
 
    });
    var $checkGyul = $("#gyul");  //결 체크 함수
    $checkGyul.click(function(){
        var $gScore = $("#gscore");
        $gScore.val(score);
        if(tt == allHap.length){  //모든 합의 가지수와 입력된 합의 수가 같다면
            score +=500;
            showImage();
            tt = 0;
        }
        else{
            score -= 100;
            console.log(score);
        }
        var $gScore = $("#gscore"); //스코어 다 하고 반영
        $gScore.val(score);
    });

});
