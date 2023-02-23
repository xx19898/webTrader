

test.only('timeTests', () => {
    expect( () => {
        const dateAsAString = '2023-02-20T18:53:15.248550Z'
        const dateAsAnObject = new Date(dateAsAString)
        console.log("FINISHED")
    }).not.toThrowError() 
})

export {}