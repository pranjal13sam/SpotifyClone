console.log("Welcome to spotify");
let songIndex=0;//for playing the first song
let audioElement=new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');//yeh jab koi masterplay pe click kare to play pause ho
let myprogressBar=document.getElementById('myprogressBar');
let gif=document.getElementById('gif');
let mastersongName=document.getElementById('mastersongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));//loop use karne ke liye array.form likhna hi parega

let songs=[ //Creating an Array of Songs
    {songName:"Nazar na Lag Jaaye",filepath:"1.mp3",coverpath:"cover1.jpg"},
    {songName:"Aa ja Ve Mahiya",filepath:"2.mp3",coverpath:"cover2.jpg"},
    {songName:"Bewafa",filepath:"3.mp3",coverpath:"cover3.jpg"},
    {songName:"I Love You",filepath:"4.mp3",coverpath:"cover4.jpg"},
    {songName:"Kolaver Di",filepath:".mp3",coverpath:"cover5.jpg"},
]

songItems.forEach((element,i)=>{
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
//Handle play pause:(gaana play karna):
masterplay.addEventListener('click',()=>{
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');

    //update seekbar:
    //yaha pe hume seekbar ko update karne ke liye basic maths use karke nikalna hai ki humne kitna song play kar 
    //liya aur kitna remaining hai
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myprogressBar.value=progress;//isse progress set ho jaayega

})

//song ko jab seekbar mei update(aage/peeche)kare toh uske liye code:

myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressBar.value*audioElement.duration/100;//yeh formula uper waale formula se aaya hai bas current time nikala hai yaha lhs karke
})

//yeh function basically pehle waale gaane ko rok dega jab hum change karenge doosre gaane pe aur play pause buttons ko v switch kardega:
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}
//jab koi doosra gaana bajana chaye toh gaana change hojaaye aur play pause hojaaye aur pause play:
Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `${songIndex+1}.mp3`;
        mastersongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;//kyuki naya gaana fir se start hoga
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src= `${songIndex+1}.mp3`;
    mastersongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;//kyuki naya gaana fir se start hoga
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src= `${songIndex+1}.mp3`;
    mastersongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;//kyuki naya gaana fir se start hoga
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})