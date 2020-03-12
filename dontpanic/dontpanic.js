let x=x=>{return readline().split(' ')},i=x(),ef=+i[3],p=+i[4],ne=+i[7],e={};
for(;ne--;i=x(),e[+i[0]]=+i[1]);
while(i=x()){
    let f=+i[0],c=+i[1],d=i[2][0],o,w='WAIT',b='BLOCK';
    (d=="N")?d=w:o=f==ef&&p||e[f],d=d=="L"&&(o>c&&b||w)||(o<c&&b||w);
    console.log(d)
}