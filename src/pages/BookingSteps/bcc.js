values.baggage.map((baggagemeals, i) => {
    console.log(baggagemeals);
    return (
        <>
        <Box key={i}>
            <Typography><label>{baggagemeals.label}{baggagemeals.value}</label></Typography>
            <Box style={{ display:'flex',justifyContent:'space-between' }}>
            
                <Box>
                <label>Baggage {ii}</label>
                    <Field as="select" name={`baggagemeals.${ii}.${baggagemeals.label}.${i}.baggage`}>
                                                    <option value="0">Select</option>
                                                    { b?.ssrInfo?.BAGGAGE.length > 0 && b?.ssrInfo?.BAGGAGE.map((bagg)=>(
                                                        <option value={bagg.code}>{bagg.desc} @ {bagg.amount}</option>
                                                    ))}
                                                </Field>
                </Box>

                <Box>
                    <label>Meals</label>
                    <Field as="select" name={`baggagemeals.${ii}.${baggagemeals.label}.${i}.meals`}>
                                                    <option value="0">Select</option>
                                                    { b?.ssrInfo?.MEAL.length > 0 && b?.ssrInfo?.MEAL.map((meal)=>(
                                                        <option value={meal.code}>{meal.desc} @ {meal.amount}</option>
                                                    ))}
                                                </Field>
                </Box>
            

            </Box>
        </Box>

        </>
    );
    ii++
    })