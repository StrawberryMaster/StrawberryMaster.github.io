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
  
  { artist: "Kylie Minogue", title: "Impossible Princess", cover: "https://yt3.googleusercontent.com/I8CFr_FE0-tJcOeQiXxEPflhNPSC3lM7CP_xJf9u3O0GSZpH04FunZ76nZpTc1-iU7Tds3mBy55aV0vv=w544-h544-l90-rj" },
  { artist: "All Saints", title: "All Saints", cover: "https://yt3.googleusercontent.com/7NVRICH3zbidLgnMJb1VpiiywUnwIq2NA7egOAAvNiFjTKitr4MV2akl1rzslsdark_LRUzbDFVJ-rU=w544-h544-s-l90-rj" },
  { artist: "Suede", title: "Coming Up", cover: "https://yt3.googleusercontent.com/h9tTPjLDSEpn1LXcmKt5WaOYeLnXPj9yVD_JQhrnuF03GARIgxe9kMsYoJL0vnjb2UTjBkOs_BbcniaS=w544-h544-l90-rj" },
  { artist: "Elastica", title: "Elastica", cover: "https://yt3.googleusercontent.com/vqDbsUfR3UTGNQDoP60UhxLdrQnmkyLNZK63-7lJ3XTIaWBC983yy9KESdMe2i9r_GbP2tkxfAs-H6vV=w544-h544-s-l90-rj" },
  { artist: "Various Artists", title: "Go: Music From The Motion Picture", cover: "https://yt3.googleusercontent.com/cD_oL4lo0MU6ednnds9XQ44BQze2FbzEyaTvCFwHGmfmYkDrouz0EvxXPeQ8hoSQwkXpqCGK1UrdlaUG=w544-h544-l90-rj" },
  
  { artist: "Chapterhouse", title: "Whirlpool", cover: "https://yt3.googleusercontent.com/RY9YRSwz3QS2xedDZj3HJRRPNLnUAeLoocEhAbt3LRp8cJsMBdsqn5WtuSKZ__3AckQLr_GaGua7uJI=w544-h544-l90-rj" },
  { artist: "Felt", title: "Crumbling the Antiseptic Beauty", cover: "https://yt3.googleusercontent.com/ipuKcDmX8n2kXJd_8xqIjNwMM6HV8Ss2WkM_hiYMinPOo0TwLy3nlDk5Ktnm9Z1vMvLhJiP0xp43R8Eu=w544-h544-l90-rj" },
  { artist: "Betty Boo", title: "Grrr!... It's Betty Boo", cover: "https://yt3.googleusercontent.com/0qJP1woqUscDzUpMudzx9kIQEnJovi-4_Ll6dRa_5Ypb3zWtEGLlrciVhhsDyAg-v2EtD0an7z_W-m1o=w544-h544-s-l90-rj" },
  { artist: "Nat & Alex Wolf", title: "Black Sheep", cover: "https://i.scdn.co/image/ab67616d0000b27378468511753349b7c80dddb3" },
  { artist: "Frankie Goes To Hollywood", title: "Liverpool", cover: "https://yt3.googleusercontent.com/acI8BLcNJv2bwaJ7d0PvF_nCHByu7STJOycvM4nra6OldIcFdpJLqxu5avYFxdK8JrCUZyuP6eKPV6iY=w544-h544-l90-rj" },
  
  { artist: "Depeche Mode", title: "Memento Mori", cover: "https://yt3.googleusercontent.com/Cuqh_JBUjzz1KMyd6ff8HEDBSuv4IEVopZ-evxuVfi8O_6QiPA6X0CHUOkjTw2Cps10YgRkXjCh200lc=w544-h544-l90-rj" },
  { artist: "Take That", title: "Progress/Progressed", cover: "https://yt3.googleusercontent.com/t9KM2sf2OgkhePGIkGjze19ljSoXz8gulCJuVQgwArEWdUq-qW1JGqe5TENvWbhkBNoVQBZPz_xhq5gm=w544-h544-l90-rj" },
  { artist: "Michael Hutchence", title: "Michael Hutchence", cover: "https://yt3.googleusercontent.com/tiYRd-GYdXxPi2sK2-Q-1DO0R6cnZ_09ARZZK7anqHCAcD5evIaeUrilw_Jz5a1OHAsv5DaNvmIK1oX8=w544-h544-l90-rj" },
  { artist: "Fernanda Abreu", title: "Sla Radical Dance Disco Club", cover: "https://yt3.googleusercontent.com/lJd1iCgY-AsDKOADSER-SXfGpnxPZjsI_dhxS7_BNk0F8nphAYc0oBpBWqyHXKZaeyuPZHNtgNX1b5Gw=w544-h544-l90-rj" },
  { artist: "En Vogue", title: "EV3", cover: "https://yt3.googleusercontent.com/C2zH5h26eTp3CrCUTvJln22Lo7Y1w6oADRSXtKGcArarAWbn_yq0oJ2NvTNMOowgJdEXWTajfjyhyBg=w544-h544-l90-rj" },
  
  { artist: "David Bowie", title: "The Buddha Of Suburbia", cover: "https://yt3.googleusercontent.com/qr6Y5DSGx-bGYC8bLzVwZQAX1lH6CIDEn6B8alkY3SWob0LuJS7o7Bb6kmMwgKH7WS7hUzG-9lkUIj5D=w544-h544-l90-rj" },
  { artist: "Rebecca Black", title: "Age of the Exhibitionist", cover: "https://yt3.googleusercontent.com/KiD9V-Z-2RSPtRVJTpHVJxFLCx_gnUfgXRo2T4Z9wW8ZcIJsbwI9NyFDL__5I_agOLCBNmbshs84VJY=w544-h544-l90-rj" },
  { artist: "Sinéad O'Connor", title: "Universal Mother", cover: "https://yt3.googleusercontent.com/IjoNRRNirhwr-JHx3hATS182BbifqkrNNg5qXNJzUEIWPVX1Neh7YW0w0_2v-wIOhyDW_3W6b5tgByU=w544-h544-l90-rj" },
  { artist: "TLC", title: "Crazysexycool", cover: "https://yt3.googleusercontent.com/kSQU9D6QK78H5myq_1KJWFeHtcwOqpeh8PfwmIYVLp_UY15b-fxyl8zjDLNPJeHLU9grra_Wgj9r4vNX=w544-h544-s-l90-rj" },
  { artist: "The Dandy Warhols", title: "The Dandy Warhols Come Down", cover: "https://yt3.googleusercontent.com/_Al2WPuV57q0drHkaB56JB1XcrYxlhwJKoAxE942QL9Rqiz9BVXZf-t_W4fd4YwVrBqWLzbURUu5hbIXfA=w544-h544-l90-rj" },
  
  { artist: "Mariah Carey", title: "Glitter", cover: "https://yt3.googleusercontent.com/ePAtyvITYoIZ3ifMeQbhJ6yOcX_1rM_4spcOaNth7n2ZlLMfuaEGbTDqXNdtVrD3Z90qTM4fB-Y8Huid=w544-h544-l90-rj" },
  { artist: "Duran Duran", title: "Duran Duran", cover: "https://yt3.googleusercontent.com/nW9fAv0C8boBlzRH4cCdC1CvEAYh-hzjZCknp1QgtsmGbPYiOt2OzoGrDKAKumSFIznLi7l4xwxzni24=w544-h544-l90-rj" },
  { artist: "Manic Street Preachers", title: "This Is My Truth Tell Me Yours", cover: "https://yt3.googleusercontent.com/AbL17nT_TutpENIxXgocBvDdI4C_TthVXdSoIPffE0UaQsicX6GULJb5u-PdMLFsVenrYx9zkdct6MDd7g=w544-h544-l90-rj" },
  { artist: "INXS", title: "Welcome To Wherever You Are", cover: "https://yt3.googleusercontent.com/FfGbOV3xEAMyK1cLVfxy-1hH4EUIog1SFLDnAcxrgPaVjcqRW0rUBpDa-1HFbKt9ANO-nCyltkKgsf7W=w544-h544-s-l90-rj" },
  { artist: "Matthew Good", title: "In A Coma - The Best of Matthew Good 1995-2005", cover: "https://yt3.googleusercontent.com/9y4z1k_5fa7pzK0ECE1s3hD1IBRHENt150phD_rBrkqV9_1vU2CPdRVmM22eUu2OGPSeLPS7ouGL0Bzq7A=w544-h544-s-l90-rj" },
  
  { artist: "Sparks", title: "Gratuitous Sax & Senseless Violins", cover: "https://yt3.googleusercontent.com/PVOAtvu-xEpxJ_BPzHq1dx7dwGKbPY5Dl3TlVauA0JWlCqJYQuWLa9Js4NCpdFanprFAowCBq1kZcXf1=w544-h544-l90-rj" },
  { artist: "Dionne Bromfield", title: "Good For The Soul", cover: "https://yt3.googleusercontent.com/9kxzv7ebFagNnvVxYidtiQhLILjFitOopaZBQr50nTrZdAcj6SKglPlO9L9hjBJDhiCKbB2OHucBDHE=w544-h544-l90-rj" },
  { artist: "Silverchair", title: "Anthem For The Year 2000", cover: "https://yt3.googleusercontent.com/SpB2S9-NPpz5cMXf7YRTTf-c8C9FsSy_t3xkgMV1XPZFULk3QlNspoBQhn1jv4ONP1z1OvWFB6tihx0=w544-h544-l90-rj" },
  { artist: "Mekons", title: "So Good It Hurts", cover: "https://yt3.googleusercontent.com/XaBQIyrDeoKrVuNwqguu8G8x8O_p3-mFS39KJJehMEx93fgwCd9YyY7uDE5xitVu6WBU-Y6vY0tw13M=w544-h544-l90-rj" },
  { artist: "M People", title: "Elegant Slumming", cover: "https://yt3.googleusercontent.com/8G6IUvlY0w2xsRDFtd3jNJNtYLGPLPaTe4z6aDe_kHBsuRD_WmyWhy9uPcEjwZeotHpxF3HSDe4l2_w=w544-h544-s-l90-rj" }
  
];

class AlbumGridManager {
  constructor(albums, containerId) {
    this.albumData = albums;
    this.reserveAlbums = [];
    this.gridContainer = document.getElementById(containerId);
    
    // dragging state
    this.draggedItem = null;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDragging = false;
    this.pointerId = null;
    this.rafId = null;
    this.lastSwapTime = 0;

    // mobile double-tap tracking
    this.lastTapTime = 0;
    this.lastTapTarget = null;

    // bind event callbacks
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

    // accessibility grid properties
    this.gridContainer.setAttribute('role', 'list');
    this.gridContainer.setAttribute('aria-label', 'Album collage grid');

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
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${album.artist} - ${album.title}. Press Enter or double click to swap album, and use Arrow keys to reorder.`);
    card.style.touchAction = 'none';

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

    // touch & pointer event listeners
    card.addEventListener('pointerdown', this.handlePointerDown);
    card.addEventListener('keydown', this.handleKeyDown);

    // desktop double-click
    card.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.swapAlbum(card);
    });

    return card;
  }

  // swap album logic
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

      cardElement.setAttribute('aria-label', `${newAlbum.artist} - ${newAlbum.title}. Press Enter or double click to swap album, and use Arrow keys to reorder.`);
      cardElement.classList.remove('swapping');
    }, 300);
  }

  // keyboard navigation & reordering
  handleKeyDown(e) {
    const card = e.currentTarget;
    const cards = [...this.gridContainer.querySelectorAll('.album-card')];
    const index = cards.indexOf(card);

    if (e.key === 'Enter') {
      e.preventDefault();
      this.swapAlbum(card);
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
      return;
    }

    let targetIndex = null;
    if (e.key === 'ArrowLeft') targetIndex = index - 1;
    if (e.key === 'ArrowRight') targetIndex = index + 1;
    if (e.key === 'ArrowUp') targetIndex = index - 5;
    if (e.key === 'ArrowDown') targetIndex = index + 5;

    if (targetIndex !== null && targetIndex >= 0 && targetIndex < cards.length) {
      e.preventDefault();
      const targetCard = cards[targetIndex];

      if (targetIndex > index) {
        this.gridContainer.insertBefore(card, targetCard.nextSibling);
      } else {
        this.gridContainer.insertBefore(card, targetCard);
      }
      card.focus();
    }
  }

  handlePointerDown(e) {
    if (e.button !== 0 || this.draggedItem !== null) return;

    const card = e.currentTarget;

    // mobile double-tap detection fallback
    const now = Date.now();
    if (this.lastTapTarget === card && (now - this.lastTapTime) < 300) {
      this.swapAlbum(card);
      this.lastTapTime = 0;
      this.lastTapTarget = null;
      return;
    }
    this.lastTapTime = now;
    this.lastTapTarget = card;

    this.draggedItem = card;
    this.pointerId = e.pointerId;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.currentX = e.clientX;
    this.currentY = e.clientY;
    this.isDragging = false;
    this.lastSwapTime = 0;

    // global listeners
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  }

  handlePointerMove(e) {
    if (!this.draggedItem || e.pointerId !== this.pointerId) return;

    this.currentX = e.clientX;
    this.currentY = e.clientY;

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.processDragMove();
        this.rafId = null;
      });
    }
  }

  processDragMove() {
    if (!this.draggedItem) return;

    const dx = this.currentX - this.startX;
    const dy = this.currentY - this.startY;
    const moveThreshold = 6;

    if (!this.isDragging) {
      if (Math.hypot(dx, dy) > moveThreshold) {
        this.isDragging = true;
        this.draggedItem.classList.add('dragging');
        this.gridContainer.classList.add('is-dragging');
        window.getSelection()?.removeAllRanges();
      } else {
        return;
      }
    }

    // move dragged element visually
    this.draggedItem.style.transform = `translate3d(${dx}px, ${dy}px, 0px) scale(1.05) rotate(2deg)`;

    // throttle swap frequency to eliminate boundary oscillation
    const now = performance.now();
    if (now - this.lastSwapTime < 120) return;

    const cards = [...this.gridContainer.querySelectorAll('.album-card')];
    const draggedIndex = cards.indexOf(this.draggedItem);
    if (draggedIndex === -1) return;

    const draggedRect = this.draggedItem.getBoundingClientRect();
    const draggedCenterX = draggedRect.left + draggedRect.width / 2;
    const draggedCenterY = draggedRect.top + draggedRect.height / 2;

    // find closest sibling card by center distance
    let closestCard = null;
    let closestDist = Infinity;

    for (const card of cards) {
      if (card === this.draggedItem) continue;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(draggedCenterX - cx, draggedCenterY - cy);

      if (dist < closestDist) {
        closestDist = dist;
        closestCard = card;
      }
    }

    // this must be close enough to warrant a reorder
    const swapDistanceThreshold = draggedRect.width * 0.75;
    if (closestCard && closestDist < swapDistanceThreshold) {
      const targetIndex = cards.indexOf(closestCard);
      if (targetIndex === -1 || targetIndex === draggedIndex) return;

      // capture snapshot before DOM movement for FLIP transitions
      const rectMap = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
      const beforeRect = this.draggedItem.getBoundingClientRect();

      // reorder in DOM
      if (draggedIndex < targetIndex) {
        this.gridContainer.insertBefore(this.draggedItem, closestCard.nextSibling);
      } else {
        this.gridContainer.insertBefore(this.draggedItem, closestCard);
      }

      // offset start coordinates to maintain continuous, smooth movement
      const afterRect = this.draggedItem.getBoundingClientRect();
      const shiftX = beforeRect.left - afterRect.left;
      const shiftY = beforeRect.top - afterRect.top;

      this.startX -= shiftX;
      this.startY -= shiftY;

      const updatedDx = this.currentX - this.startX;
      const updatedDy = this.currentY - this.startY;
      this.draggedItem.style.transform = `translate3d(${updatedDx}px, ${updatedDy}px, 0px) scale(1.05) rotate(2deg)`;

      this.lastSwapTime = now;

      // FLIP animate affected cards
      const newCards = [...this.gridContainer.querySelectorAll('.album-card')];
      newCards.forEach((card) => {
        if (card === this.draggedItem) return;
        const oldRect = rectMap.get(card);
        if (!oldRect) return;

        const newRect = card.getBoundingClientRect();
        const dX = oldRect.left - newRect.left;
        const dY = oldRect.top - newRect.top;

        if (dX !== 0 || dY !== 0) {
          card.style.transition = 'none';
          card.style.transform = `translate3d(${dX}px, ${dY}px, 0)`;

          requestAnimationFrame(() => {
            card.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
            card.style.transform = 'translate3d(0, 0, 0)';
          });
        }
      });
    }
  }

  handlePointerUp(e) {
    if (!this.draggedItem) return;
    if (this.pointerId !== null && e.pointerId !== this.pointerId) return;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);

    const card = this.draggedItem;

    if (this.isDragging) {
      card.classList.remove('dragging');
      this.gridContainer.classList.remove('is-dragging');

      card.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.transform = 'translate3d(0, 0, 0)';

      let cleaned = false;
      const finalizeReset = () => {
        if (cleaned) return;
        cleaned = true;

        this.gridContainer.querySelectorAll('.album-card').forEach(c => {
          c.style.transition = '';
          c.style.transform = '';
        });

        card.removeEventListener('transitionend', finalizeReset);
      };

      card.addEventListener('transitionend', finalizeReset);
      setTimeout(finalizeReset, 350);
    }

    this.draggedItem = null;
    this.pointerId = null;
    this.isDragging = false;
  }
}

// initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const manager = new AlbumGridManager(albumData, 'album-grid');
  manager.init();
});