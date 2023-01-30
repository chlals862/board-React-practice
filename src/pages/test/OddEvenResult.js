//정적인 데이터가 아닌 동적인 데이터로 홀수, 짝수 구분
const OddEvenResult = ({count}) => { //count state를 props로 받아와야함
                                    //count는 Counter의 컴포넌트에 있기 때문에
    console.log(count);
    return <>{count % 2 === 0 ? "짝수" : "홀수"}</>
};


export default OddEvenResult;