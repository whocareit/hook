# hook学习
## hook介绍
## 使用State Hook
## 使用Effect Hook
1. 副作用：
* 不需要清除的： 在React更新DOM之后运行一些额外的代码：如：发送网络请求，手动变更DOM，记录日志等
* 需要清除的：当使用外部数据源时，需要去清除数据
2. useEffect渲染时机：在默认情况喜爱，会在第一次渲染之后和每次更新渲染之后都会去执行
3. useEffect作用：告诉组件在渲染之后执行某些操作。
4. useEffect放在组件内部调用的原因：可以在effect中直接访问state中的变量
5. effect返回函数：effect可选的清除机制，每个effect都可以返回一个清除函数
6. react何时清除effect：react在组件卸载时执行清除操作
## hook中需要去注意的点
hook需要遵循的两条规则：
1. 只在最顶层使用hook
* 注意：不要在循环，条件和嵌套函数中调用hook
2. 只在react函数中调用hook(不在普通的js函数中调用hook)
* 在react的组件中调用hook
* 在自定义的hook中调用其他hook
3. 在hook中定义全局变量方式，第一就是使用useState,，第二就是在函数外部,因为使用hook时，会自动将其内部的变量清零
### ESLint插件
1. eslint-plugin-react-hooks的ESlint插件来强制执行上面所说的这两种规则
2. react怎样知道state对应的是哪个useState
* React靠的是Hook调用的顺序，在hook中调用顺序在每次渲染中都是相同的，如果放在条件语句等，其执行顺序就会不一样，从而导致报错
## 自定义hook
* 作用：可以将组建逻辑提取到可以重用的函数中
### 提取自定义hook
当两个函数之间共享逻辑时，会将其提取到第三个函数中，而组件和hook都是函数
* 自定义hook是一个函数，其名称以use开头，函数内部可以调用其他的hook
* 自定义hook必须以“use”开头？
1. 必须如此，如果不遵循这个约定，就无法判断某个函数是否包含对其内部hook的调用，react将无法自动检查hook是否违反了hook的规则
* 在两个组件中使用相同的hook会共享state？
1. 不会，自定义hook是一种重用状态逻辑的机制，所以每次使用自定义hook时，其所有的state和副作用是完全隔离的
### 多个hook之间共享传递信息
## Hook API
### 基础hook
* useState
返回一个state，以及更新state的函数
1. 函数式更新：新的state需要通过使用先前的state计算得出，将函数传递给setState,该函数将接收先前的state，并返回一个更新后的值
* useEffect
1. 接收内容：一个包含命令式、并且可能有副作用代码的函数
2. 清除effect：实现方式，effect函数需要返回一个清除函数
3. effect执行时机：在浏览器完成布局和绘制之后，传给useEffect的函数会延迟调用，因此不应该在函数中执行足赛浏览器更新屏幕的操作。
4. 默认条件执行：会在每轮组件渲染完成后执行，因而一旦effect的依赖发生变化，他就会被重新创建。要改变其执行时机，需要给useEffect传递第二个参数，只有当第二个参数值发生改变才会重新创建订阅。
注意： 如果要使用这个优化的方式，需要确保数组包含了所有外部作用域中会发发生变化，且在effect中使用的变量。如果只想运行一次effect，可以传递一个空数组作为第二个参数。
* useContext
1. 用法： const value = useContext(MyContext);
2. 描述：接收一个Context对象，并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的provider值
### 额外的hook
* useReducer
1. usereducer这个hook的封装，整个封装的方法如下：
```
//reducer hook封装
    import { useState } from 'react';
    export default useReducer function(reducer, initialState) {
        const [state, setState] = useState(initialState);
        function dispatch(action){
            const nextState = reducer(state, action);
            return setState(nextState);
        }
        return [state, dispatch]
    }
//实际例子使用
    import  useReducer from '';
    const initialState = {count: 0};
    function reducer(state, action) {
    switch (action.type) {
        case 'increment':
        return {count: state.count + 1};
        case 'decrement':
        return {count: state.count - 1};
        default:
        throw new Error();
    }
    }
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'devrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </div>
    )
```
2. 使用reducer的惰性初始化： 使用init函数去返回初始值，在创建的过程中需要初始化值
```
    function init(initState) [
        return { count: initState};
    ]
    const [ state, dispatch] = useReducer(reducer, initialCount, init);
```
3. 注意：如果reducer hook的返回值与当前state相同，react将跳过子组件的渲染及副作用的执行
* useCallback
1. 返回值：返回一个memoized回调函数，该回调函数仅在某给依赖项改变时才会更新。
useCallBack(fn, deps)相当与useMemo(() => fn,deps)
* useMemo
1. 使用方式：const memoziedValue = useMemo(() => computeExpensiveValue(a,b), [a, b])
2. 返回值：返回一个memoizedValue值,把创建函数和依赖项数组作为参数传入useMemo,仅在某个依赖项改变时
才重新计算memoized值。
* useRef
1. 使用方式： const refContainer = useref(initialValue);
2. 返回值：返回一个可ref对象，其.current属性被初始化为传入的参数(initialValue)。
* useImperativeHandle
* useLayoutEffect
1. 更新时机：在浏览器执行下一次绘制前去执行
2. 与useEffect相同，会在所有的DOM变更之后同步调用effect
* useDebugValue

## useEffect去取代calss中的生命周期函数的方式
### react中有状态组件中，其生命周期函数的各个阶段
1. 在Mounting阶段
    * constructor()
    * static getDerivedStateFromProps()
    * render()
    * componentDidMount()
2. Updating
    * static getDerivedStateFormProps
    * shouldComponentUpdate()
    * render()
    * getSnapshotBeforeUpdata()
    * componentDidUpdate()   
3. UnMouting
    * componentWillUnmount()

### 使用hook去代替生命周期函数的方式
* componentDidMount(),在hook中需要使用下面的这种方式去取代，在useEffect中传递第二个参数，该参数为一个空数组，只会去执行一次，如下面所示
```
useEffect(() => {

},[])
```
* componentDidUpdate(),有两种方式去解决
    * 1. 在每次渲染的时候都去调用hooks，解决的方式如下面所示
    ```
        useEffect(() => {

        })
    ```
    * 2. 用一个特殊变量的去触发hook,如下面所示,count指的就是这个特殊的变量，该hook触发，只会是count的值改变时
    ```
        useEffect(() => {

        },[count])
    ```
* componentWillUnmount(),用hook来代替，需要去return一个callback(回调函数)，如下面的形式所示
```
    useEffect(() => {
        return () => {
            //执行的为componentWillUnmount
        }
    },[])
```
* shouldComponentUpdata(),在默认情况下，它将对props对象中的复杂对象进行浅层比较，如果想要去控制比较，可以去提供一个自定义的比较函数作为第二个参数。代替hook的方式如下所示
```
    import React from 'react'
    function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
    }
    const Weather = ({weather}) => {
        return (<div>
                <p>{weather.city}</p>
                <p>{weather.temperature}</p>
                {console.log('Render')}
                </div>
        )
    }

    export default React.memo(Weather, areEqual)
```
