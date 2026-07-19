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
  { artist: "The Beatles", title: "Let It Be… Naked", cover: "https://resources.tidal.com/images/dac3cee7/d258/4468/9274/1eae507b0738/1280x1280.jpg" },
  { artist: "Pet Shop Boys", title: "Actually", cover: "https://resources.tidal.com/images/f42ebf37/b664/4c77/af7e/f4792fad4f2f/1280x1280.jpg" },
  { artist: "Kraftwerk", title: "Tour de France", cover: "https://resources.tidal.com/images/65aed63c/bda1/420e/afd8/8c36157b1f61/1280x1280.jpg" },
  
  { artist: "Michael Jackson", title: "Thriller", cover: "https://resources.tidal.com/images/6cecc1ea/421c/4535/bafa/f6d56cbfc756/320x320.jpg" },
  { artist: "Janet Jackson", title: "Damita Jo", cover: "https://resources.tidal.com/images/75343062/c435/41b9/9b42/11b44d9b1523/320x320.jpg" }, 
  { artist: "George Michael", title: "Patience", cover: "https://yt3.googleusercontent.com/f_iGMwB81onSpcW23-GEYoiyv_nfae3md_V4cKFJ5uOv4ws-8YJmWAGgOWmD5Pe00qpaql_jWT1W5nvh=w544-h544-l90-rj" },
  { artist: "Tina Turner", title: "Wildest Dreams", cover: "https://yt3.googleusercontent.com/yAX83obtuojW8pXa-6z2uZhMpCueCEvTj3aT1GG2ikD4tACQxt1hZVuAllVZNciL3uH-LX8ziXJvC3mBGQ=w544-h544-l90-rj" },
  { artist: "a-ha", title: "Hunting High and Low", cover: "https://yt3.googleusercontent.com/Hl4_H5E5uxO1esv1hHPd9Y8Nbui-J0356F41rkK5rXTEty0zCfxjPa_yHKp24xcZDQInH28FiZM1HCpI=w544-h544-l90-rj" },
  
  { artist: "Alphaville", title: "The Breathtaking Blue", cover: "https://yt3.googleusercontent.com/gpJ3hEV2iZMHusRAsRUijML2NIiGt5Vl8Tt1cCjeR6JScXY8DNlh-XqikZz8mzNHxkom1Xup4uOYlpFK=w544-h544-l90-rj" },
  { artist: "Anelis Assumpção", title: "Sou Suspeita Estou Sujeita Não Sou Santa", cover: "https://yt3.googleusercontent.com/CkPzom7X_YubtaSd74vJ8MBlFkl4obNJ0Gpr1zhNckXuqoZpIAGHLomVaNIBANp-etyxihVNgGiacKY_=w544-h544-l90-rj" },
  { artist: "Blur", title: "Leisure", cover: "https://yt3.googleusercontent.com/Ed-WeXINrTJwmYJudzSf31HfuCcvO3l2ug9JcTW-Z5Z6ruNJWQUPjskut_imGKp71vc46rYZT8SC75Bs=w544-h544-l90-rj" },
  { artist: "Moloko", title: "Things to Make and Do", cover: "https://lh3.googleusercontent.com/tFYEqBdjg2fFhX2rVf0SmkS0vhjvHi7Yf7S8iNWCQfkBeaKa-FbBrPEDP8ifE2UrqHcuScTst4hqNIKS=w544-h544-l90-rj" },
  { artist: "Bobby Brown", title: "Bobby", cover: "https://yt3.googleusercontent.com/g5y34IApPFYmAeMnz6H0EQ-0Ch5ebRq0eYs9X8qfVuvkKRWamg2bUVDhCtOwA4GITjTpET7b_m1bkA5QTA=w544-h544-l90-rj" },
  
  { artist: "Sananda Maitreya", title: "Sananda Maitreya’s Symphony Or Damn", cover: "https://yt3.googleusercontent.com/mdtHglNU0VP1Hdjn-uJA19jN_UNtgPiHR3OH_yCr28DOb1HGjyisPJjde3zzlzwAygLD1BObpJKnIw4X=w544-h544-l90-rj" },
  { artist: "Deacon Blue", title: "Walking Back Home", cover: "https://yt3.googleusercontent.com/qnZP5X3MvEbtLeRbwI8XE2SLXTUWgOKSQELkuLxWpjLjdgmPnqhOJwAfUPf97Yzp_6HUKBWwU5RRhJx8=w544-h544-l90-rj" },
  { artist: "Weezer", title: "Maladroit", cover: "https://yt3.googleusercontent.com/k4nOOBSgcSfOm4z8tXvsXtdv1A2srufsx24kM8k_K6Nh2-rjV-zawEjEj91GB3KGr9Z5kWcn-ouTJWE=w544-h544-l90-rj" },
  { artist: "Lorde", title: "Pure Heroine", cover: "https://substackcdn.com/image/fetch/$s_!aFyo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe926c826-b7af-4003-a934-dea77cb2f734_640x640.jpeg" },
  { artist: "Britney Spears", title: "Glory", cover: "https://yt3.googleusercontent.com/0iDiPGe-km5Y6p1iQG8exq7r8qkdU8rLnLxfrKBTZpec5CT1WZVWsgiepFQCk0TWT_HQtFEqrzN2gdz7Zw=w544-h544-l90-rj" },
  
  { artist: "Sia", title: "Some People Have Real Problems", cover: "https://yt3.googleusercontent.com/GpJWcKyTRSOYeH6sQe6MtmFPyhO4UJ0ZWSZOKOTica4nyh-zfDgQJVDm79y348VqgZOpzpSyHD1ujFQK=w544-h544-s-l90-rj" },
  { artist: "Pullovers", title: "Tudo Que Eu Sempre Sonhei", cover: "https://yt3.googleusercontent.com/l0jK1EpMDFIm-HKgZ7DP5UQ_Rw24mg2iuOyyAc5_3Od1a-BHsBkl93QzX8PIkSXrrpsjDGp6dY-qzH0=w544-h544-l90-rj" },
  { artist: "Antropoceno", title: "No Ritmo da Terra", cover: "https://lh3.googleusercontent.com/2rE00E57bpYBqFO2fQZWVk2kvTg0M4GXZEPZ3a5qKRw8AGDbcst6-SVELrpGH9rcsMdCsiNvOoAxamD-yQ=w544-h544-l90-rj" },
  { artist: "Marisa Monte", title: "Infinito Particular", cover: "https://yt3.googleusercontent.com/c_SVOJDCPh682P5651zr4SMfRQTAbRrm1_zmdXygpiJMSQ34YqP1KoF-pcJ79qNUA_8TCX1Oo__7CKjkmw=w544-h544-l90-rj" },
  { artist: "Eva Cassidy", title: "Simply Eva", cover: "https://yt3.googleusercontent.com/I1NHFSWk8hyWuaFI7k1APq5njwRQeRy8R9qPVlrZwM1N6CvO32uUffrUm676x6hT23GqYpZxqcRS7QT1TQ=w544-h544-l90-rj" },
  
  { artist: "Preta Gil", title: "Prét-A-Porter", cover: "https://yt3.googleusercontent.com/5OXksDe4tWSCGKDmuB1YDpSW8_UkJPd8LMO5i8e1UI1DYKOFDmh2bJuLpju9LUGX5U7ozNQB4v-tXGJQ=w544-h544-s-l90-rj" },
  { artist: "Kylie Minogue", title: "Kylie Minogue", cover: "https://yt3.googleusercontent.com/4s3RE4gmikjinkryLvzRsDeybwRhy7KJPVNix5B75G6w4ZisAVnJSvjXcjG7kbk9Q3oaoXjLnkrOJVs=w544-h544-l90-rj" },
  { artist: "Aaliyah", title: "Aaliyah", cover: "https://yt3.googleusercontent.com/0lMgPyQ6dKxpMDcZ5PGOFnFHJjQYm9deWVpuMFFYDGqPPK4zup8WTZX2J3yeo4MngwnC4TYWUpwrp77fAQ=w544-h544-l90-rj" },
  { artist: "Bryan Ferry", title: "Taxi", cover: "https://yt3.googleusercontent.com/mySO8bgJAIvJKb_-az4Jd-3nLUhhQJmFz-H-RZoHfuqaxG4DWDFcfmEZSUyVbT6ja7RPPZ36BAXYTa8=w544-h544-l90-rj" },
  { artist: "dälek", title: "From Filthy Tongue of Gods and Griots", cover: "https://yt3.googleusercontent.com/GTVMfwe5mvWkcUDoO3kSvFLPX_fFHz02Oohf53MFVoQ1ZwteHWqEx-cphpBCjuxRhVfTk6UFXuSPXn4W=w544-h544-l90-rj" },
  
  { artist: "Roxette", title: "Crash! Boom! Bang!", cover: "https://yt3.googleusercontent.com/yiGUYdNWnGdv05YMHtbnIGcV8RqrdFuiysFWT2ujSrRJdjro5MNmDHxnSt46NxcL53qBk4YGk5q0uV6d=w544-h544-l90-rj" },
  { artist: "Telekinesis", title: "12 Desperate Straight Lines", cover: "https://yt3.googleusercontent.com/H5KL5cWKzJMfzZBcEHzPVo2LB4_aC0lqGYtlW20ZKuXNf6p6Q4eLjWOtJqH5guaHI766UpEel-PoiMgD=w544-h544-l90-rj" },
  { artist: "ee", title: "Ramadan", cover: "https://yt3.googleusercontent.com/aHANHSUYCocpivA-LEAukWhL1MjeimAMK8iw-q-m1qg-aqr2dA-KHe8yW7ZSEpQPDXj_QWMaefpstJxPvw=w544-h544-l90-rj" },
  { artist: "The Brand New Heavies", title: "Brother Sister", cover: "https://yt3.googleusercontent.com/Xp0UfFEt0zzBOqeaLTATPi6mNsgz8zHjWH5iYaC4NktAkgqTpdB6hNYagSQLQunML58R544KnXTPSMoQ=w544-h544-l90-rj" },
  { artist: "A Flock of Seagulls", title: "A Flock of Seagulls", cover: "https://yt3.googleusercontent.com/dK018LIk-85GIiDIkNGLWgC46AlDVbE3LJoksbQJwyZwf6ZKIKHKhFdoUH4u1Wr1ovTIC-kfqI_IEpkf=w544-h544-l90-rj" },
  
];

class AlbumGridManager {
  constructor(albums, containerId) {
    this.albumData = albums;
    this.reserveAlbums = [];
    this.gridContainer = document.getElementById(containerId);
    
    // pointer events dragging logic
    this.draggedItem = null;
    this.startX = 0;
    this.startY = 0;
    this.isDragging = false;
    this.pointerId = null;

    // bind methods to context
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  init() {
    if (!this.gridContainer) return;

    const shuffled = this.shuffleArray([...this.albumData]);
    const activeAlbums = shuffled.slice(0, 25);
    this.reserveAlbums = shuffled.slice(25);

    this.gridContainer.innerHTML = '';
    activeAlbums.forEach(album => {
      this.gridContainer.appendChild(this.createAlbumCard(album));
    });
  }

  createAlbumCard(album) {
    const card = document.createElement('figure');
    card.className = 'album-card';
    card.setAttribute('draggable', 'false');
    card.style.touchAction = 'none'; // prevents page-scroll while dragging on mobile

    card.albumData = album; 

    card.innerHTML = `
      <div class="album-inner">
        <div class="album-front">
          <img src="${album.cover}" alt="${album.title}" loading="lazy" draggable="false">
        </div>
        <div class="album-back">
          <span class="album-artist">${album.artist}</span> 
          <hr style="width: 50%; border-color: rgba(255,255,255,0.3); margin: 0.5rem auto;">
          <span class="album-title"><em>${album.title}</em></span>
        </div>
      </div>
    `;

    // touch and pointer events
    card.addEventListener('pointerdown', this.handlePointerDown);

    card.addEventListener('dblclick', () => {
      this.swapAlbum(card);
    });

    return card;
  }

  // double-click swap
  swapAlbum(cardElement) {
    if (this.reserveAlbums.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.reserveAlbums.length);
    const newAlbum = this.reserveAlbums[randomIndex];
    const oldAlbum = cardElement.albumData;

    this.reserveAlbums[randomIndex] = oldAlbum;
    cardElement.albumData = newAlbum;

    cardElement.classList.add('swapping');

    setTimeout(() => {
      const img = cardElement.querySelector('img');
      const artist = cardElement.querySelector('.album-artist');
      const title = cardElement.querySelector('.album-title');

      if (img) {
        img.src = newAlbum.cover;
        img.alt = newAlbum.title;
      }
      if (artist) artist.textContent = newAlbum.artist;
      if (title) title.innerHTML = `<em>${newAlbum.title}</em>`;

      cardElement.classList.remove('swapping');
    }, 300);
  }

  handlePointerDown(e) {
    // only left clicks or primary touch inputs
    if (e.button !== 0) return;

    const card = e.currentTarget;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.pointerId = e.pointerId;
    this.draggedItem = card;
    this.isDragging = false;

    card.setPointerCapture(e.pointerId);
    card.addEventListener('pointermove', this.handlePointerMove);
    card.addEventListener('pointerup', this.handlePointerUp);
    card.addEventListener('pointercancel', this.handlePointerUp);
  }

  handlePointerMove(e) {
    if (!this.draggedItem || e.pointerId !== this.pointerId) return;

    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    const moveThreshold = 5;

    if (!this.isDragging) {
      if (Math.hypot(dx, dy) > moveThreshold) {
        this.isDragging = true;
        this.draggedItem.classList.add('dragging');
        this.gridContainer.classList.add('is-dragging');
        
        // clear active browser selection ranges
        window.getSelection()?.removeAllRanges();
      } else {
        return;
      }
    }

    // suppress native touch actions and browser selection tasks
    if (e.cancelable) e.preventDefault();

    // update physical visual coordinate translations of the dragged item
    this.draggedItem.style.transform = `translate3d(${dx}px, ${dy}px, 0px) scale(1.05) rotate(2deg)`;

    // identify sibling element beneath the pointer coordinates
    this.draggedItem.style.pointerEvents = 'none';
    const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
    this.draggedItem.style.pointerEvents = '';

    const target = elementUnder ? elementUnder.closest('.album-card') : null;

    if (target && target !== this.draggedItem && target.parentNode === this.gridContainer) {
      const cards = [...this.gridContainer.querySelectorAll('.album-card')];
      const draggedIndex = cards.indexOf(this.draggedItem);
      const targetIndex = cards.indexOf(target);

      const targetRect = target.getBoundingClientRect();
      const beforeRect = this.draggedItem.getBoundingClientRect();

      // determine the primary axis of separation between the dragged item and the target
      const isHorizontal = Math.abs(targetRect.left - beforeRect.left) >= Math.abs(targetRect.top - beforeRect.top);

      let shouldSwap = false;
      if (isHorizontal) {
        const midpointX = targetRect.left + targetRect.width / 2;
        if (draggedIndex < targetIndex) {
          // dragging right
          if (e.clientX > midpointX) shouldSwap = true;
        } else {
          // dragging left
          if (e.clientX < midpointX) shouldSwap = true;
        }
      } else {
        const midpointY = targetRect.top + targetRect.height / 2;
        if (draggedIndex < targetIndex) {
          // dragging down
          if (e.clientY > midpointY) shouldSwap = true;
        } else {
          // dragging up
          if (e.clientY < midpointY) shouldSwap = true;
        }
      }

      if (shouldSwap) {
        // capture structural dimensions prior to DOM structural changes
        const rects = cards.map(c => c.getBoundingClientRect());

        // perform reordering step
        if (draggedIndex < targetIndex) {
          this.gridContainer.insertBefore(this.draggedItem, target.nextSibling);
        } else {
          this.gridContainer.insertBefore(this.draggedItem, target);
        }

        // calculate translation offset caused by reordering
        const afterRect = this.draggedItem.getBoundingClientRect();
        const shiftX = beforeRect.left - afterRect.left;
        const shiftY = beforeRect.top - afterRect.top;

        // calibrate reference points to maintain exact visual alignment with the pointer
        this.startX -= shiftX;
        this.startY -= shiftY;

        // update transform to align with adjusted pointer anchors
        const updatedDx = e.clientX - this.startX;
        const updatedDy = e.clientY - this.startY;
        this.draggedItem.style.transform = `translate3d(${updatedDx}px, ${updatedDy}px, 0px) scale(1.05) rotate(2deg)`;

        const newCards = [...this.gridContainer.querySelectorAll('.album-card')];
        
        // batch FLIP reads
        const offsets = newCards.map(card => {
          if (card === this.draggedItem) return null;
          const oldIndex = cards.indexOf(card);
          const oldRect = rects[oldIndex];
          const newRect = card.getBoundingClientRect();
          return {
            card,
            dX: oldRect.left - newRect.left,
            dY: oldRect.top - newRect.top
          };
        });

        // apply transformations as write operations
        offsets.forEach(offset => {
          if (!offset) return;
          const { card, dX, dY } = offset;
          if (dX !== 0 || dY !== 0) {
            card.style.transition = 'none';
            card.style.transform = `translate3d(${dX}px, ${dY}px, 0)`;
          }
        });

        // trigger exactly one global reflow to batch styles
        this.gridContainer.offsetHeight;

        // run animations
        offsets.forEach(offset => {
          if (!offset) return;
          const { card, dX, dY } = offset;
          if (dX !== 0 || dY !== 0) {
            card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            card.style.transform = 'translate3d(0, 0, 0)';
          }
        });
      }
    }
  }

  handlePointerUp(e) {
    if (!this.draggedItem || e.pointerId !== this.pointerId) return;

    const card = this.draggedItem;

    card.removeEventListener('pointermove', this.handlePointerMove);
    card.removeEventListener('pointerup', this.handlePointerUp);
    card.removeEventListener('pointercancel', this.handlePointerUp);

    if (this.pointerId !== null) {
      card.releasePointerCapture(this.pointerId);
      this.pointerId = null;
    }

    if (this.isDragging) {
      card.classList.remove('dragging');
      this.gridContainer.classList.remove('is-dragging');

      // visually transition held card to its settled grid position
      card.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.transform = 'translate3d(0, 0, 0)';

      const finalizeReset = () => {
        card.style.transition = '';
        card.style.transform = '';

        // sweep remaining inline sibling transitions
        this.gridContainer.querySelectorAll('.album-card').forEach(c => {
          c.style.transition = '';
          c.style.transform = '';
        });

        card.removeEventListener('transitionend', finalizeReset);
      };
      card.addEventListener('transitionend', finalizeReset);
    }

    this.draggedItem = null;
    this.isDragging = false;
  }
}

// initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const manager = new AlbumGridManager(albumData, 'album-grid');
  manager.init();
});