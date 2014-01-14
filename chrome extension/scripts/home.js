home = function() {

  evhStop = false;

  getMoney = function () {

    $goPro.css({'opacity': '0.5'}).prop('onclick', null);

    this.playCoinSound = function() {
      var sound = document.createElement('audio');
      sound.setAttribute("type", "audio/ogg");
      sound.setAttribute("src","data:audio/mpeg;base64, SUQzAwAAAAAHdlRDT04AAAANAAAB//5PAHQAaABlAHIAR0VPQgAAACYAAAEAAAD//lMAZgBNAGEAcgBrAGUAcgBzAAAADAAAAGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UsAAAAps7y+0koABRYtw9x7EQpLEWkUk2M2wBs2QAgBBUExOQADDb0CC0aNIAwO5CTnQPi76nOhz+c85+c50D4vIynOgmd//+d+pzzv/O/6HPJU50D4uOcD69f+JxwPvh8u+D4WD6IiVaslcjSTTacTadTpLJVCW81cIgwDHNM/jtMleFjjGvgQiSDAFxxHVUkL5bLDaQqnsbFffYPNokd5RwoxRJs1KTK/TscmvdITlm7//IyFmQITook4mBKkgeo+Ais7/fg6zhEaV0TBN//tSwAuACJE7b72mgCkCJ+z1mJ20R5tD2f/qrZanup7qU6Q4gANkq3b///0W1P91P36VX6v47U2/62/+5v/9//zgokWlkJlBNgmD4sWs5f9R/oeysyozHh9qEuz+vRbU+15iAREe6//T3T6mrv+6zkt+yXd/0A72///qX6f//7lv3xciC3EzNlbElSYIjNvH/+F0uUS3JByU0qqpdn01oU6/d9AE+k/V/639P5205/Zs4yffpb+oG1///+pn//9uovc7SAjECYkiMXgieOWOsdX/+1LAJwAIFTtr7UVNoPsnbLmZHbSYKyinxg19BOSB0HQvrs21W2ovgPw/1f///frUx6N1NNS+v6/wEf/9f9Rj//1/jr/i4Cd8WVGkhGCqEL86O6QdCuX0tjkAlSBZCXkU3fupN6e70+ZgEqhroP9e3//qvrSqu7+pDfV/yT//Ifd+Cd+ipQq9IRCQIUxW5Q+WUad5+sYKf+zG5fmIJ3bfcc5wehsggh7PU/1j3AvjBl6a2M00y4XFpo//la2qrXT/uQjn/tYCP///9H////GaAP/7UsBFAAfk1WumUathKKdtfZaVsCB4CiQCQCCYNL//D0Sh5cSh+AqIErgVoDVJJltkW//nR0i5SCmJdapFFlGRNB0alI//////QeAnnP/nHf//sK3Od3/3//+8qc9YqABDiJAIRJNtsBGf/7AOlTqopaLLMAuIAbzkBJ5FSf/a7LpPTVatFnJoAwM6Krf/233bvr1ayaDqa7L6/ff9be3Jp/VqV9fX//qkasASnJhDEDjSRJIIs26g9GQ0qTqx6zE2QAB6EDkjiIkg6vT7XVUr//tSwF4ACVVDaaXM7aEuqKw8mjWw02b88AMDNF/79PTvb9f0AEmfp0/v09/GBN///v/rlCUAmXdCEgUSRJIDn/A0DIYAccSmaekdH0CBWBrhBHDRNmdkv1eqyLvZlshdIBg47ILXe3WuyvpOuu/6CtMFK/UzffUyrKZXfuLiGtl7/b/t98yKdW+gUtlaBdKgICJogAIAAUCMRiskISOc2DYWwEbEnjqX00HTTfutb1M36aAXuLXV/V1bqrq//Xiij/9+u7tt9XSNe3/6kPTv+gn/+1LAcIAIoUVl5lFNoVGorDyaNbWOvQaLDKpiR9ctBYEpeEoUuCMbHtqnPJ1hHgkoAzA8rkK1qSVS2voq9dLd+mDZ03qv6lpaFVFt+v9H8N9/S/f19vfUrFmj1vfqrut93tZvXJ5kpCwReVVCASpYFB0S7UOUI4GpoqnGMeqLoD0AHhBkyO5FJvUy3e1dVatStWgASKKj57tf2Ula91VspWv6lgriP7P99aFSraN9mFiW/WqpbqbXrqalboZ0bFIbWKNLKZgIUqigeVKKZ4Rh2P/7UsCBgAktR2OE0a2hRaisuMo1tM6FZ9TtGxlAAQ+BpUGE6XPb9Oyk9XXrtUdAoD0VZ/3f1+zuuru+nVqOA30ka7v197upt/101kgU0LLX69WndOrbp0s4PF2mL8ABenhBAC5ZVgjlWCBGShEyTH0UUlSwE8gLCMB5dv6qkdn6VSnX5wCCFNt/6ndr3QUtH+tq50JkujWrUg66+jqqrV62WLim6vS9dupVdSb9ZxMmSzYlE6zGRp/9UDGs4TTeEopSy4n59QWwslBG8HOIqkip//tSwJIACxVHX8ZRraFfqOv4yrW1rL+pqq1KqZ3fqMQMCLNeknrf6aT623fQ+t+oFZ7MpfWi6tl9TqV7cnFnb6/R6l/9VFx1mqVgFukbCdVIqPtxDBuH5PEuErkg86lzgdYCzADsFS2SbboWXWt9S7O9TIM67rNgAhhtUyK6/Vr/Up3TTVt1dgbTqZSv///9Sh3lF9ad/upJ6lf6tUzKVXUZtsmU7qWgAhsAKQNGgkKxSqefHSw/ghVAbkWUx6NUqktbLbpU1o2pooq7IAsLKr3/+1LAl4AKfUVhxM2toVIo7LjKNbQEl9f6n7pNdT6frvhSt31Id/7e6qlMuLE/rqSR37IPdlPd1dF2UdJRThtQEhiHQxI6qWgYX+mSSh6VmbiL6H5UC0cBiBDhOLUvVWtddVSNlq2s9akwGAaf1r71Lu6DI19vd3X0K6QOd7+qrRWyluvW1Nak6VblApt0XZd2ovW9Om7UV130Ban3NyYkUU6GJBdS0BH+P4OmBEjQks0CY+AQtwM6WJwbz+v+qiut1VIN1VAYEIe6n9/2fWg2tf/7UsChAArFRWGGUa2haijscJo1tKl37VOsGwz2vdXvZd0W+mhpzohD692Rap2rrUkupWtW7KVKjVu/OhF5eGISOqlUD1qaCS+Odi1qxHq5YZAUIgFkCBDtS1pKUtdOm7o7L1XRWuo6AgaX2ub7e+vutqlWZP+lZQTdL/pbVd1vf2sqO40/+gtfrt/vmRbKgRS8IhGn/1QPk5OyvFZ2duLTiNYQ8AwOAaCBo4ifQdVkXu61Iuvu2hWitdjIIQsktaB7936+q1FV9Vf50IjRvXVW//tSwKaAC91JYcZVraFkKKw4mjW1nS+jWrstuod5RrW/Znqu2pnVVe6lqzpC0q2AFYhlQhI6qmgW4yOAiD+OR2fuPn9k8BGhHwAJSmQrOv0/atdVTV9dNRiA9p3pe3tatLatKtenqrZ0AR1B2ZBqt0/qRt9Ot9AXV6+q7/qd7pv6S2qMTBhJYYDleiKdVKoCCYHE4EqhxVQUkqGcSY1DGwKoxzSeXdJ6aTuutlqU7K21orVMgAARWXWjVVX6PrVrspJuqpasJE6t117La/6ltWn/+1LAqIAKZUVhxlGtoXAorHjKtbXQVealrVq9T/dV1syH+pZAx2ASiqdEIE++qBjxyHsPYJI+KmC7c3HIAexA6JIkSIO3o+v6C2Qutey3RAYBnnqOXeup7VUWVTVTZSqNetDUCZah3Rfqs1bWZfa+8aDZN73aqrqfui9l71POFGlRYTm2hkI0cciTYKG38OVhEhNrWSOLmR+BJWBuhRNDtSZ1bvQ3fQ0mNXd97HAcRP6006b6XazLT7o1IbdS7Qf/Wvsylugr/etNtBxZGi6mdP/7UsCugAsRR2HGTa2hZ6isMJo1tfvR9ndlL9bup5OJdMc2uBKIpmQjP/6sGOzYXFo8KJkfIbp/HQlw5QAv6QYxVbXtpLpIXVpWXZ6ZgAESLTpVOpVJ63fSQRUyKGq/W2zudBSOtJf21d1v6CNT1OXyytnVq+ha67qRTTXRTvPjKNms2IxDupCR1UtAMVfAKkPAFXDZefXUIeDREBihZPjfZ1OmqpCtSHa/+muZgAByvqer0bvO/efns+++bABunR9E/15qmPRVaCMhRE2nmmu7//tSwLMAC3FFY8XRraF0qKy8yjW1ms1TzJlDnY/xiLVlvvAn/aIlU0qwRv7wGDi5GdNIJJrEyBUYAWTGZHciltRZ21rUlTVVqRQ9QDwinXapbMzvoPbsnSWtCp6l9R0Kyvv6dbLdStdOp3u1GSJTa6u1S7qXVf6kl35iUHry4TidQSZlVB8RE8ih9GJNUiJd6/tIYBEqB1whIlzUp2ZbX2U62SRUswdG3OhISirPqWyaS3dmV66CKC2dJNW7OrOBMT1VanqopbpLUupP2VW+Owr/+1LAtIAL9UVjxlGtqWyo6/iaKbVKTsp7ra26ldbN+vUQWzbigAI5mVMjT7+/Bmo7szYLKjTBE3qMlAmjAwQgwGy661pLXRqqQ6eu7qrVcLED7KWepXb1v66/66aKS9BYK8tmrszWst2VZV2a10UqliGPNrp0lpJNdaN6STuy6m8qvgKxu5UTPadkIEccjbbGE5tJIo4l1QdNQL6FcMsg9gOIupfaj7sup6lpKTrXWYg2zKilqPpakWV6FGbKUhRdV0q1VtdQKnV2ToIJaDNfT//7UsC1AAttRV+E0a2hi6irsMo1tdB110jYs6kNSk2arW3rWjTU7tUR2QpOYAUol1MTO6loIkiK7uFcVJUa1f7Z4OsCh4DYByuSbUFMi9LbZ71JUK/wLAC2tVdlXara6aLv3fr1VV1ik/3dWz1VVLdXU82oOgNaL0O7JtVe73XqS028nlJCTCglEw6mJn9U1DZuuEYqIiAhLD9e220UQQnANqFKJJIvSU61Oupamuky9ToP1KBECNHvq+p9Ls/XZ+r1ToLBlPXrqtvV1v7anXH0//tSwLOADCFDY8TRramHKOy8yjW0/an/a6Wkiqp0Ft9R00RQMYLgEXaGQxIqaVQY2v4UiTEQblOBJdw7LgWNgK2hwnEdN1030Kta3Wi9NXqTC0U3585Ztqo+xs841uifO1QAWd0tuzof90QxEzVrioX1OZV0tbuy9O3sKEfNlst5top01KhULCUXFBIIaxg4eWrqQlgJbAJMSBLPs6FLZd0EUN0EkVb0pgFiSkbIP29V0kbVKa7JVrqUheiEkW11LVU6Nb10lst2utf1jMpJFrL/+1LAsAALXUdhxlGtoWoorDjKNbQXtuve6+rZfnDWrPfACW/0TcabSTQtpfdkfnS8rOVqx18vAOJgDxCLERSReupSlKfZK7N32XrBoDTQW5/u6dtV3UzutmRq60lOprh96tbUXdTuzpqXtfa7oKLxQtZnpLR/ZqmRWyVBBSCcnEvO2KdaQSKahEI0jTbTYGH904OD5DboXbQpCbAgSA5wMiRuh7VK7NdF3Zkm1eZBahLY9XUi719HpJOm1OylJbMnWEWtoalVqrqdK/ZazVdFFv/7UsCzAAsJR1/GUU2peSir8Mm1tUBrJWtFSk0N1pqWtSDu9VrVMm7LI6IQdUACOJdkI0cbbTcFv/XD4qHSVApSpYlQh8BpOZkkjZ19TPXVpLU1aT16RiFg2Uul9v3ZlPoeqtetd1BOUHf267/b3TXXWkxFP6Sqd6TrSutkVrXV+i06ZKDHhkzf1oFbMLWRY8PsJLHY3bP2rLGicC6QVfEVNk+q7umpTXdb6t9TcLmD+62dN6u6ltTU96/sy9S1KD1VbV06qCKl+rtp1rNC1ad1//tSwLWADHFFYaZRramPqOx8yjW0utkU91su6kE1rWv2QRWQFGdFMhOImFQzZxNttgbfSSMYJUA9PqJtYOyGAVMgacMVCIJtUu1Sa1VOzPTQ1/sIuaLZkl1s1e9m3RSv9HVWjTcKRm6mZFNBrqTQfX0XdGiy1jESQZBkEFKdlLTWgi2pmV0UEUGY4QVj0KUp1NIJMqqoxWBIWRkoJxZaPlLVfQyaAoVA2QApERdnQM3p1oN7Irdk2WyNB1LCyk3QaX1Uu74/rvdD++Gzb4mnRDL/+1LAr4ALKUVl5M2toXKo62zKNbVcAW5t8MlkRZ57LdLKiqllc8nuslHHV11d1cxc3fV93Nv47neonbxW8ugSKIVDIztqqBaz/9pHKjpJiT484Xw5ABsSTxnv0X1pXW7LZJTppp/QD4m2Mo/pojp6mt3bVmuYoEhuxjmMi2RkVnPc9JyJd7FIzLNoYyq7bpZUU5GWiNq7KKXXbAmmIQxI6aqsOZPAO0NifRtojqkA+waYAQMvku3a9q0H2dd62/w9l9zkf+rftOX1f9UBG66nIf/7UsCygAzhRWPmUa2psCjrcMottIy5iWWqG3/1iOfSf6uYZPShyK0+iX7EZczK6SADOXdUNFcbjbgCPqMsAMHxwdRUhS0ugPDAqDJ0iSKVJmSQQOrWq7VLUggytSapkDUAkp2a/ddnzGqepjHMi0s/MUA51+Yz3VrPa5hplqJPnFh2bN9rersYe8s5PLzpx49C8c849WywFES6oRp9/0EWu8OBqHyw/5WmhYhKAFRIAWo1Ki1Lat27ro7PZT71MpEOLZ6OrJq9b17vMea6PVVP//tSwKcAC3lFYcZRTalIqKw4mam01QAiSazkatGZWrNVFNs6NmqMHrOr5vzV+51rGNjiRCkSmXhkI1bUbbYG1/6AOjscFJlZU8/UpBHIGoBwkUmU2l9etXSX+izh8D9F1rRQROJrV3RRui+nRrtbwsuySnq0Un1opIGa2Up0uykSIeVUyvel/0t6Kk9zAWWqssEqmyCabvwER4DZYCCMKDMhWgTXXikMiDuJFjFJnUmnU6TIumpTqahQuteyw6drzkP3RD0uppxsx9zs92t3aBz/+1LArgAM1Vdj5NFNoWWo7HjKKbRO5k52m0mtRjz0m2us5h+WdV1U7S/2Pq7FUVTbu43toLAFeIZTEiZqWyLxiFIHDseURofISh2NsjwaMA4BSN7rUqtupVtde29a1xRTdWbmrZLTbH51kOzqGKetaoBf9qe6HV2tb6n4vp79enc2e3uqKs8bDHHqpATN4lkM0ccbbcGG3zpH4pnSVo8X3PiZBqMAOpl0dyLHWTdSKVGmesyDsnSU10tALmmp7Ll8T3FvZTW883xczHVsiJvVAv/7UMCsAAuNQ2PmTa2pgKirMJopsQ/qWzF8XUXURTdkNlt22mVZqX9u2Pt89TTX1sa6HsY+GVTWPVVnKc1IAYiGciI6aqooP2u8EpKQzB1Q42p9AUmBaETpgtfR1XdalWdF0VVt9xAVPuqdEb6L6sllmvOPrMDN6sc7GOyOiqjqzObZlPXOOcXHZjXqdvd9XMZLUZ9VUlYBlefsBLIdSIzpqqwZlXzAwCS4ZSMMMxOBPhxRcJB6l2TQZ/ddeup0/UgIyZ3cy1+vSimNZro+/M7/+1LAqwAKyUVhxk1NobaobDzKLbV4Tl83uk270ZaG3dLXdxcyrNYwyt2kCZ6Gsj7GqjVICUC2DFsQEXhnciIqaqoWZsiccCUTSYXOWrHoEg9kEeCeKq2dVbKZutO1anapbN1iRrrV+lzmoyu2iGfdprVzkAJMVb2Hz7TpxZbOhzMd2djHJkX9HVTEsprPuk2allU9ShdphcMpNusaKbVTWDW6sOw/OjQsnZmnPELaGwhAAzpPH2d2TdSamW/+pPZSCnRUIQJO7m0zN9lsYcy52//7UsCnAAuZRV/GUU2paKir+JiptN/SYfAuObN+vmujslOlKHxHtc7RXOSu6o7Guea5z1dWQm0DFxwEaWdSIj+6qwhoGg0ANCD4Eilp5TIoVgLQDfOlrWVqslSUy91NdbP1IMC3rQeGdn0mXquvn7Spmpj+OeegQ/il55e7purm6e5qb1m4gkf9LX1DPEQnLRxf7VUXO4yt11z2xGZp3IiOruqKHTw1jwNapstL13qOQJ4KuJ1JFXVrTU7dLo9G91OJ8NkavVL7O6ntPXW552fc//tSwKmADAFFX8ZM7aFvqOvwySm06zMpwEZ6O5t+ek0lRjk5zJVFO5hfmmWojVuj7Nf2moilonet66ASmLp0NHkccbbDnrjgNHQYJhCoYrUaghQGY8WlszVq0Hqo3QsupLVQXFuZ9ns9e5iLS16IupzMYbV4BC6oUfsx7qhxjNMqbecjnRM3ez3ONu9DlONOrv1oxbaXQlAHEwymaK45I20UJvQOiuDRp1BWOvLigyUEcOFV6CDopJnDBd6qNXHTXd8TyADf33/11NQ62PdE8Mv/+1LAqYAMKUVfxLUNqWyo6/jJqbWN0OY62wy1A/0z0+CpkD4PKaUZxRZjJt9kmXMtn/4+ohNt9Odr6lATepljNEcckbcG2s+JC4QzA/UqTKq3HIYC4l5aWzvXXRdq2fTUk69tQs5BusxcxP16wtXo8OjtG788wkgdESOpuYjqNn7S/9Ju6X+a2mL+JZIviqeL+edp4S8e/s1HqF2SUlKmZVFqsREgwPDElnZ5RGUkkFhACFWfVQZS1q7M2tlKQZq0ZZ6g72PO8jSjPU9zKsZdT//7UsCpAAudRWXkwO2hfpesfMitbTCcxbk7Lhc7HKZQzMo5qq9LHzrmKeshP1ox53j8tX0VvjvN97uL7BLb8k3V3VCxcXxJHXBGfEnE8JiamZqOoH8upLQW1XZq0aaKVbXSu6q0DHNVlR3Z2acro9udQw1DT0ecapgX1TS82jrSzTJxmz80tc8Sr8CCZdgK1miZ/up5uOy45gCindyIzbbTTUCHVoGCEBx8aERFnwpEHAlx40qTWkutJqSE+nW1Fata1stYctkrpWi0NftM0+ro//tSwKiAC91FY+ZJDalzn+twxql1e1Wdqgj3Y1NqvOqm+rsOsrO7lHucYutrFzatmbbInVC3e9uskAl7Ik23I42wMbx06RikM5RVWPTIKhZ5b9oxMxzvvbv+ot08TTUWAEoYiSps82tuPauOZp46nKPacxGl4C9yxHKsukXdXFw7yqR9c3UjKqhys1Xb1f49wLWjrg9IDMl1QASeapiM0bkbbbKE/GHrwnHRcdStE5OmwRkkW1PZanWt7KSQfdlqupqUBOn0hafvrGpzb7px/3//+1LAqIALqPVfhkVLqXIorDyWnbVVHo9qHn/dEyp1Q474ReN/rer/PQsAaco/+NjsBbhM0WUwT4B+9jV/4k3X3VB7UjH9ZPAmMj9mBFFZwcAZd3NNm2qaxxyP/Rn97zwAp1rwmstw1tE1xLXd3XS266pG1B3F3bffX2sFRTT6tGzKg+O1WksCw2U3qdZ87/xCM+2M/Ruv+Sbv/qhbwgnY5lMfz87LiZg6iVICODOaKZDQVXstddVwlRSevy4Cyesztd371N29szU1ylmykQ1TG//7UsCpgAwJIV+mLQupcqAsPMahdQhRz7Bcer61NpZ7W8FX3d46s7V98n79oOo0n8k30DNZEknX01CxGHNB+Qh2VWKp7uMFg6AGBcq0txbRX1K17fBNXMt/JIKTeLue1mJ35WNYhr+Xe37na4pFi76XvmzV+yG9x/cuVjZ8HjMTZmsuezItCJu+bEhdsVaHZlMzbkksiAzokAoRiQLiklCxMgDXLUSXMYzlMqOjkNlarNKU4dWq2uwqZfG4aqpsaw/1MtjWH9llUmmcqMVkDH7G//tSwKkAC0T7W4YpC6lll6swxqFtQUtf/yOl/WOe2gqZ5QKS68K/woAy2SNp//yAEkF0OYK43WBRIl0woaugJByK8g1dLJpuQUuObVLgWRmBiYZgLoBHDCiQwIV1VKNGZqUanAJqAgJMpMxqTH2GpMBNGPakGFOTEvJCJQFxNIkgqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+1LArQALMNVRhiELaV8kKLySjXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UsCyAAsU2SGHoGtAAAAlwAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw=");
      sound.play();
    };

    document.title = "initializing ...";

    var totalAds = parseInt($('#spnTotalAds').text()),
        adsLeft = totalAds - parseInt($('#spnWatchedAds').text()),
        balance = parseFloat($('#lblBalance').text().replace(',','.'));

    this.done = function() {
      document.title = "Done! balance: " + balance + 'kr,-';
      $overlay.fadeOut();
      document.dispatchEvent(new Event('adPlayCompletedEvent'));

      $('#player').remove();
      $('#ScratchCard').show();
      $('.eo-button').first().click();
    };

    this.watch = function() {
      
      var self = this;

      $.ajax({
        type: "GET",
        url: "/api/adblockapi",
        dataType: "json"
      }).done(function(abm){

        // the returned data block will be null if no ads are left
        // we'll end the script that is the case. 
        if (!abm) {
       
          self.done();
          return false;
       
        }

        // these are the values required for verification
        abm.Campaign.isViewed = true;
        abm.AdStatus.value = "Completed";
        // abm.StartTime > abm.RequestTime
        abm.StartTime = abm.Campaign.StartTime = (new Date()).toISOString();
        
        var randomEndTime = Math.round(Math.random() * (10 - 2) + 2),
        countDown = abm.Campaign.MediaDuration + randomEndTime,
        titleTimer = setInterval(function(){
          
          if (countDown <= 1) { clearInterval(titleTimer); }
          
          var msg = 'Ad ' + (totalAds - adsLeft) + '/' + totalAds + ' has ' + countDown + "s left ..";
          document.title = msg;
          $('#evh_timeleft').text(msg);
          
          countDown --;
       
        }, 1000);

        var timeout = setTimeout(function(){
          // abm.EndTime >= abm.SartTime + abm.Campaign.MediaDuration
          abm.EndTime = abm.Campaign.EndTime = (new Date()).toISOString(); 
          
          // post the updated abm object.
          $.ajax({
            type: "POST",
            url: "/api/adblockapi",
            data: JSON.stringify(abm),
            contentType: "application/json",
            dataType: "json"
          }).done(function(){
            
            adsLeft --;
            playCoinSound();
            updateUserBalance();
            checkAdStatus();
            $('#lblBalance').text(balance);
            self.watch(); // recursive step
          
          });       
        
        }, (countDown) * 1000);

        var stopEvh = setInterval(function() {
          if (evhStop) { 
            
            clearTimeout(timeout); 
            clearInterval(titleTimer);
            self.done();
          
          }
        });

      });
    };

    this.scrach = function() {
      // ಠ_ಠ
      var $evh_scratch = eo.scratchCompleteHandler,
          $evh_cards = $evh_scratch.cards,
          trimmedCards = [],
          wins = 0; 

      $("#eo-game .eo-card").each(function () {
          var b = $(this),
              cardId = b.data("cardId");

          // scratch the cards
          $evh_scratch.scratchComplete(cardId, b.index());
          //check if we won
          trimmedCards.push({ 
            won: $evh_cards[cardId].won,
            prize: $evh_cards[cardId].winnerCard
          });
      });     

      $evh_scratch.render();

      $.each(trimmedCards, function(i, card) { if(card.won) wins ++; });

      var msg = 'vandt på ' + wins + '/' + trimmedCards.length + ' skrabelodder';

      $('#evh_scratch').text(msg);

    }

    this.watch();
    this.scrach();

  };

  $('#popupReferrerClose').click();

  var $overlay = $('<div id="evh_overlay"></div>')
  .css({
    'width': $(window).width(),
    'height': $(window).height(),
    'zIndex': 10000,
    'background': 'rgba(0,0,0,0.5)',
    'position': 'absolute',
    'top': 0,
    'transition': 'background-color 0.5s ease'
  })
  .appendTo('body');

  var $handler = $('<div id="evh_handler"><h3>Eovendo Headless</h3></div>')
  .css({
    'padding': 10,
    'position': 'absolute',
    'top': 10,
    'left': 10,
    'backgroundColor': 'white',
    'border': '1px solid #888',
    'borderRadius': '3px'
  })
  .appendTo($overlay);

  var $info = $('<div id="evh_info"><div style="color: red"; id="evh_warn"></div><span id="evh_timeleft"></span><div id="evh_scratch"></div></div>')
  .appendTo($handler);

  var $goPro = $('<a class="green-bt" href="#" onclick="getMoney();"><span class="evh_btn">Begynd</span></a>')
  .appendTo($handler);

  var $cancel = $('<a class="red-bt" href="#" onclick="$(\'#evh_overlay\').fadeOut(); evhStop = true; "><span class="evh_btn" >luk</span></a>')
  .appendTo($handler);

  $('.evh_btn').css({
    'textAlign': 'center',
    'fontWeight': 'bold',
    'color': 'white',
    'background': 'none'
  });

  $('#evh_handler a').css({
    'marginRight': 10,
    'float': 'left'
  });

  var currentVersion = 'mlNpjQDx8JDiEpZ_ZPvBADDKX5gF-7V11MKj16ZgOpk1',
      version = $('script[src*="adplay"]').prop('src'),
      v = version.indexOf('v=');
      version = version.substr(v + 2, version.length);

  if (version !== currentVersion) {
  
    $('#evh_warn').text('Player version changed, beware!');
  
  }

};

// due to the sandboxed nature of chrome extensions, we inject the script via. a <SCRIPT> tag.
chrome.extension.sendRequest({method: "getLocalStorage", key: "evheadless"}, function(response) {
  
  var evh = JSON.parse(response.data || "{}");

  if (evh.active) {
    
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ home +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
  
  }

  if (evh.automate) {
    
    var script2 = document.createElement('script');
    script2.appendChild(document.createTextNode('getMoney();'));
    (document.body || document.head || document.documentElement).appendChild(script2);
  
  }

});