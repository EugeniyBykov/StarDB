const compose = (...func) => (comp) => {
    return func.reduceRight(
        ( prevResult, fn ) => fn(prevResult) , comp
    ); 
}

export default compose; 