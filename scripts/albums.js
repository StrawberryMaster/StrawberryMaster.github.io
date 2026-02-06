// albums
const albumData = [
  { artist: "Michael Jackson", title: "Invincible", cover: "https://i.pinimg.com/736x/86/37/1c/86371c52bd76e0eb1e618d1dd8cd832c.jpg" },
  { artist: "George Michael", title: "Older (& Upper)", cover: "https://cdn-images.dzcdn.net/images/cover/f96d146a71cc3d9cedb52c614d5008c7/0x1900-000000-80-0-0.jpg" },
  { artist: "Weezer", title: "Opposite Sides of the Same Good Ol’ Fence", cover: "https://archive.org/services/img/WeezerOppositeSidesoftheSameGoodOlFence/full/pct:500/0/default.jpg" },
  { artist: "Jamiroquai", title: "A Funk Odyssey", cover: "https://lh3.googleusercontent.com/vJr2REfaQsmWY59xTZjKKAixocyT6NzCl7Q_5SxYWH48ziUyU-ISGGUBxEbmzxFhka450ZL1N4vFow0r=w544-h544-l90-rj" },
  { artist: "Radiohead", title: "The Bends", cover: "https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png" },
  
  { artist: "Depeche Mode", title: "Songs of Faith and Devotion", cover: "https://lh3.googleusercontent.com/7qztatWBFx_hwibDMDA4k_t5i7P2FoRzswSmrPn9ro8wSawMdA9ZAZfAKFNcXkOZqy_47VBXm5h_oH2I=w544-h544-l90-rj" },
  { artist: "Sneaker Pimps", title: "Think Harder", cover: "https://lh3.googleusercontent.com/7cBHblfdrmu5L73EFCMxvBxFOTIRxTAGm0V1Imy3kRxjkTOQ8HyETx30zsm_ztowFFrMayFcVb6b2LA=w544-h544-s-l90-rj" },
  { artist: "Pet Shop Boys", title: "Behaviour", cover: "https://lh3.googleusercontent.com/1DgHObVGBjii3ElgTelS9rbYVOm-RsS0RwA2A3qvP2fPzCD53mUBUwnFpidG5_j1yDg_q70oSVQfsVg6=w544-h544-l90-rj" },
  { artist: "Robbie Williams", title: "Reality Killed The Video Star", cover: "https://lh3.googleusercontent.com/hhBfK_wr51MvRvTLb1sBJ927npTPft62aKYWk6BubtTSR77wRxvmAO1vAjCs7R4oCCF2vrX9sBJ-xcM=w544-h544-l90-rj" },
  { artist: "XTC", title: "Nonsuch", cover: "https://lh3.googleusercontent.com/Dhi8MUltkljAhJUfX6HVbL6sXxsEndmUP-CdFnlUOMl4UA-KPBBg2Ib749GDYJBAoVHGtuujgXMVXlCWqA=w544-h544-l90-rj" },
  
  { artist: "Lenine", title: "O Dia em que Faremos Contato", cover: "https://lh3.googleusercontent.com/0_zR7maOSqEP49UrfXF2dDMUjjHkqQ6IZRpbhcqBGvdANtGCJqAsnb6Z4J7OvsNZhwRtHgmnSMx35rIiuw=w544-h544-l90-rj" },
  { artist: "Echo and the Bunnymen", title: "Ocean Rain", cover: "https://lh3.googleusercontent.com/mbomD0JAl6L_sVTLgSesBNqD0A_roeGlh9ciz_Tq0qaL-ojnaFmx_MY5aWfVQwYx6LD01451ex6XhIE=w544-h544-l90-rj" },
  { artist: "Radiohead", title: "Hail to the Thief", cover: "https://upload.wikimedia.org/wikipedia/en/6/61/Radioheadhailtothethief.png" },
  { artist: "Muse", title: "Black Holes and Revelations", cover: "https://upload.wikimedia.org/wikipedia/en/c/c5/BlackHolesCover.jpg" },
  { artist: "The Strokes", title: "Is This It", cover: "https://www.stephenwilsonstudio.com/cdn/shop/files/the-strokes-is-this-it-691646.jpg?v=1720539522&=1946" },
  
  { artist: "Nine Inch Nails", title: "Fragile", cover: "https://lh3.googleusercontent.com/VKs3lqI6w_9Y5ssPJIE1HfDMu3Ppy0fxA6DqufS7hm5ZBRLZ_OVzhTxcX2HrVp5-wDz2PsNingwYRoA=w544-h544-l90-rj" },
  { artist: "Television", title: "Adventure", cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Adventurealbumcover.jpg" },
  { artist: "Jeff Buckley", title: "Sketches for My Sweetheart The Drunk", cover: "https://lh3.googleusercontent.com/BMsYeD-xRRcxCVaz2T8HssN5xYKC-S-rNVLARZvDuxVVjuGFMLmp_vs4mFRAod1szvZ13da0kS5MQGYk=w544-h544-l90-rj" },
  { artist: "Juanpalitoschinos", title: "Natsukashii", cover: "https://lh3.googleusercontent.com/6PdfDhQmkj3ynYBDbNSWvyOAowgu6CzZOjnGDMHacUA-WuB0RvQPghGWG-VmibjoeDoBGEFPJGk1btvciw=w544-h544-l90-rj" },
  { artist: "KMFDM", title: "XTORT", cover: "https://lh3.googleusercontent.com/ne5EaydK_xI_Ul4F5CHOZ-yfYsXm8XgDpsTT9_0_xVhGn1HMm811GPIpoivBWrAPa3gaVX41dXgcVJc=w544-h544-l90-rj" },
  
  { artist: "Roberta Sá", title: "Sambas & Bossas", cover: "https://lh3.googleusercontent.com/A71_B7GEszfuYPtpjtLga3uhorb3dt-cd8DEFGqHObZQUH34CyJ8sYPDH8-fw9i643VIS_7gdx7jhJQZ=w544-h544-l90-rj" },
  { artist: "The Smashing Pumpkins", title: "Mellon Collie and the Infinite Sadness", cover: "https://lh3.googleusercontent.com/VMWBpSXgG5fcJ4bGGRpbrZm8YaSq33FM_k35KQ9da9vu-PZAxHdnvRL2vIFFoqAyucQ0IlHFHrBAwFhk=w544-h544-l90-rj" },
  { artist: "Cage The Elephant", title: "Tell Me I’m Pretty", cover: "https://lh3.googleusercontent.com/UWkZaxW3vojNbI0hS2WtY5dFyKt3hy25CBcjCCTuRGPHepp9LpV0AvZj7Ab4ul1qDduNwfU3oAxQhJDK=w544-h544-l90-rj" },
  { artist: "David Bowie", title: "‘hours…’", cover: "https://lh3.googleusercontent.com/9h4nP2UGpyL55e7fDTktgdaiITD0i2iE61xC_-Yi7Cp7VnJD9xsPZzHOu-oT17Q3OenJZwGtzGwg7fsK=w544-h544-l90-rj" },
  { artist: "Duran Duran", title: "Duran Duran", cover: "https://lh3.googleusercontent.com/DNrPgypeWdHwy1SOSUIaLGBg-G5mTCfxjmOZrehWe-6r8icX5UPVmYtks0Jd3fnpKGTLQN43hCg5YkyV=w544-h544-l90-rj" },
  
  { artist: "Prince", title: "Musicology", cover: "https://lh3.googleusercontent.com/TbspPdUPFM6Wn8OqCOC3dtIsE8ONI8yH3E6RvhRrQUddY1H2C8ZqAUc_Zl-lcquUbxmylxPhDNKzTdND=w544-h544-l90-rj" },
  { artist: "Inhaler", title: "It Won’t Always Be Like This", cover: "https://lh3.googleusercontent.com/sSlmMCtQMMfC9UQWOwgtBXvLFBtFC9rwYOFDiOB08JyjQWH4Rtlh9t9pB7pYwnCj94-WvOG1wyYGPbgq=w544-h544-l90-rj" },
  { artist: "George Michael", title: "Songs from the Last Century", cover: "https://lh3.googleusercontent.com/OyVjHHL2VdEJYLbmfdn2tPUAkomulnNhuuEEFkBmwA9sXoNDSr67uF90CPB3j6C9U7H-g6Jv_u29wrg=w544-h544-l90-rj" },
  { artist: "The Dream Academy", title: "The Morning Lasted All Day", cover: "https://lh3.googleusercontent.com/ZQqFdfvVd_5GlJzbvoTwY06wJzzEdLY7PpM8ymS2sUruwAPUQVcexUiH9iHXLbDb1AQqK5rB_xnBJKK6=w544-h544-l90-rj" },
  { artist: "One South Lark", title: "Vista Beach", cover: "https://f4.bcbits.com/img/a0164851657_10.jpg" },
  
  { artist: "Hot Flash Heat Wave", title: "Soaked", cover: "https://lh3.googleusercontent.com/6ErfTBrplek_IjdX_GByssmNaFYaw6LZrcn7sKnmYi79rMuYIREZWXeqUcyGbsF0Sd19ro0ujyqtBx8Brg=w544-h544-l90-rj" },
  { artist: "Okey Dokey", title: "Tell All Your Friend", cover: "https://f4.bcbits.com/img/a3041383472_10.jpg" },
  { artist: "Joywave", title: "Cleanse", cover: "https://lh3.googleusercontent.com/N0Av0O_N2fvcH3jRV2GDDYOySkzdmQzH9T-NQkBoo131PRWXalTzZj9LDhAc4II_YfOZpeBY5Z2dsqFZ=w544-h544-l90-rj" },
  { artist: "Stevie Wonder", title: "Songs In The Key Of Life", cover: "https://lh3.googleusercontent.com/QPjPdnQN2wTIqNhE6Eg0Bq2QCKht67LoQxXtOBC7ExR4GAk6a26woMHgw3cHSQL9qDCQ8Qs3ajtL3wg=w544-h544-l90-rj" },
  { artist: "sombr", title: "in another life", cover: "https://lh3.googleusercontent.com/_3P_ycF_4M8BJrGxiTVL1N3MVDKx_Q9yDqKTzAwsNVsWmHKdHkowxXYXn79WSWS1rmQL8GGfPxXswE6i4Q=w544-h544-l90-rj" },
  
  { artist: "Sananda Maitreya", title: "Sananda Maitreya’s Vibrator", cover: "https://lh3.googleusercontent.com/vhd98YlgS1Sh4FCmoJ3e2zi4eyAnOtKjp-aiNpcxJ94eYA-VAzAUMPwuQ1aI_MctD18JXtdPP8Rky0tj_g=w544-h544-l90-rj" },
  { artist: "Garbage", title: "Anthology", cover: "https://lh3.googleusercontent.com/DDtDynvFIjlzgihW6lGHOu_merTtTBhgdCxToACpa4-r-w6lsfIZhyaUx3VbvIfT0TJvrjZGthk0Fjzi=w544-h544-l90-rj" },
  { artist: "Marina Lima", title: "Pessoa", cover: "https://cdn-images.dzcdn.net/images/cover/8ca9db5ab546004d870b0c5494bb0eab/500x500-000000-80-0-0.jpg" },
  { artist: "Twenty One Pilots", title: "Clancy", cover: "https://cdn-images.dzcdn.net/images/cover/4f2819429ed92d35a649d609e39b29b5/500x500-000000-80-0-0.jpg" },
  { artist: "Leonard Cohen", title: "Ten New Songs", cover: "https://cdn-images.dzcdn.net/images/cover/63b2807e57b8a3f9b81640753a779abd/500x500-000000-80-0-0.jpg" },
  
  { artist: "Cocteau Twins", title: "Four-Calendar Café", cover: "https://cdn-images.dzcdn.net/images/cover/a399da69db41b8d3c7529aac6e9a4534/500x500-000000-80-0-0.jpg" },
  { artist: "Amy Winehouse", title: "Frank", cover: "https://cdn-images.dzcdn.net/images/cover/7baacf310cb67ceda09b945343a45fe2/500x500-000000-80-0-0.jpg" },
  { artist: "Gustavo Cerati", title: "Bocanada", cover: "https://cdn-images.dzcdn.net/images/cover/d0532f8fbe9cb0eabd385508e52b597f/500x500-000000-80-0-0.jpg" },
  { artist: "Hoodoo Gurus", title: "Stoneage Romeos", cover: "https://upload.wikimedia.org/wikipedia/en/9/96/Stoneage_romeos_HG.jpg" },
  { artist: "Sonic Youth", title: "Experimental Jet Set, Trash And No Star", cover: "https://upload.wikimedia.org/wikipedia/en/5/51/Experimental_Jet_Set_Trash_and_No_Star.png" },
  
  { artist: "Whitney Houston", title: "My Love Is Your Love", cover: "https://lh3.googleusercontent.com/j7IRUS0AIufuS1O5ZybAMrDjHoSHHfEDhu1_xFbFWlzUdiQZzJhWVQUEbmUghptw1C3ZLDJw8WzvUIaRfw=w544-h544-l90-rj" },
  { artist: "Sneaker Pimps", title: "Splinter", cover: "https://lh3.googleusercontent.com/4DKQ0q2scA_QPFtWPXpcGcxcmT5JCtfLvs_BGAdg_Oq5tAwOSNk8pmKfXSpeemd9stMdSdl984lp9XIK=w544-h544-l90-rj" },
  { artist: "Jessie Ware", title: "What’s Your Pleasure?", cover: "https://lh3.googleusercontent.com/UVC-bGcwpsj-r3ei4IujE2RSU22loglOwUrqKfZumTQMOyhISOkQYydFHXes6YXlRmXwkzA5qNhJB1K5=w544-h544-l90-rj" },
  { artist: "Sophie Ellis-Bextor", title: "Shoot From The Hip", cover: "https://lh3.googleusercontent.com/OqcX6VfhiDuAp9HfaeFQM5WLmBGQoFgouhWq1yI5Z74XOaxshK5BTxsnmZxcIQJ44MaznL_bDodZZ9bh=w544-h544-l90-rj" },
  { artist: "IAMX", title: "Kiss + Swallow", cover: "https://lh3.googleusercontent.com/u5rBAGiPSqNlz1YdRYOZhKrzf7yAQHBA4FShKMUfF3eL5-6ueaXehmqKf1SRj1oy90hy0xy2558Zw_e_-Q=w544-h544-l90-rj" },
  
  { artist: "Robin Thicke", title: "The Evolution of Robin Thicke", cover: "https://lh3.googleusercontent.com/ObMhkZ6O7VFf0VKIpykMqPRFZnZAsu20cMU3kGU9xS7hMJL8mdoNhNxU9HScero3OB9AmbournejXp1b=w544-h544-s-l90-rj" },
  { artist: "D’Angelo", title: "Brown Sugar", cover: "https://lh3.googleusercontent.com/M9qf-OjW35BAr3nIVg3cZEYAiff45G6TYII-8HxI9u4aj5JMLFarvglBTfnArYunEKIiIhiUweoKAci-=w544-h544-l90-rj" },
  
];

const gridContainer = document.getElementById('album-grid');

// helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// render the HTML
function renderAlbums(list) {
  gridContainer.innerHTML = '';
  
  list.forEach(album => {
    const card = document.createElement('figure');
    card.className = 'album-card';
    
    card.innerHTML = `
      <img src="${album.cover}" alt="${album.title}" loading="lazy">
      <div class="album-info">
        <span class="album-artist">${album.artist}</span> 
        <span class="album-title">${album.title}</span>
      </div>
    `;
    gridContainer.appendChild(card);
  });
}

// shuffle and show first 25
function init() {
  const shuffled = shuffleArray([...albumData]); // create a copy so we don't mess up original order
  const selection = shuffled.slice(0, 25); // take top 25
  renderAlbums(selection);
}

init();

function shuffleAlbums() {
    init();
}