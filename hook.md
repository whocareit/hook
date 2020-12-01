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
2. 惰性初始state，initialState参数只会在组件的初始渲染中起作用，如果初始化state需要通过一个复杂计算来获取，则可以传入一个函数，在函数中计算并返回初始的state，此函数只在初始渲染时被掉用，如下所示：
```
    const [state, setState] = useState(() => {
        const initialState = someExpensiveComputation(props);
        return initialState;
    })
```
* useEffect
1. 接收内容：一个包含命令式、并且可能有副作用代码的函数
2. 清除effect：实现方式，effect函数需要返回一个清除函数
3. effect执行时机：在浏览器完成布局和绘制之后，传给useEffect的函数会延迟调用，因此不应该在函数中执行足赛浏览器更新屏幕的操作。
4. 默认条件执行：会在每轮组件渲染完成后执行，因而一旦effect的依赖发生变化，他就会被重新创建。要改变其执行时机，需要给useEffect传递第二个参数，只有当第二个参数值发生改变才会重新创建订阅。
注意： 如果要使用这个优化的方式，需要确保数组包含了所有外部作用域中会发发生变化，且在effect中使用的变量。如果只想运行一次effect，可以传递一个空数组作为第二个参数。
* useContext
1. 用法： const value = useContext(MyContext);
2. 描述：接收一个Context对象，并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的provider值
3. 注意：在调用该方法时，需要传入的参数必须是context对象本身
### 额外的hook
* useReducer，能给那些会出发深更新的组件做性能优化，因为可以向子组件去传递dispatch而不是回调
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
2. useReducer的惰性初始化，可以选择惰性地创建初始化state。因此需要设置一个初始化函数作为useReducer的第三个参数传入，这样初始化state将设置为init(initialArg)，如下所示，就是一个实际的案例在useReducer中去传递第三个参数
```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```
3. 注意：如果reducer hook的返回值与当前state相同，react将跳过子组件的渲染及副作用的执行
* useCallback
1. 返回值：返回一个memoized回调函数，该回调函数仅在某给依赖项改变时才会更新。
2. 含义：把内联回调函数及其依赖项数组作为参数传入useCallback，它将返回该回调函数传递给经过优化的并使用引用相等性去避免非必要渲染
useCallBack(fn, deps)相当与useMemo(() => fn,deps)
* useMemo
1. 使用方式：const memoziedValue = useMemo(() => computeExpensiveValue(a,b), [a, b])
2. 返回值：返回一个memoized值,把创建函数和依赖项数组作为参数传入useMemo,仅在某个依赖项改变时
才重新计算memoized值。
3. 好处：这种优化有助于避免在每次渲染时都进行高开销的计算
4. 渲染方式：传入useMemo的函数会在渲染期间执行，不要在这个函数内部执行与渲染无关的操作，如属于useEffect中的副作用。如果没有，那么新的值将会在每次渲染时被重新渲染
5. 注意：依赖项数组不会作为参数传递给函数，概述来说，就是每一个出现在函数中的参数也应该出现在依赖项的数组中
* useRef
1. 使用方式： const refContainer = useref(initialValue);
2. 返回值：返回一个可ref对象，其.current属性被初始化为传入的参数(initialValue)。这返回的的对象将在组件的整个生命周期中持续
3. 含义： useRef就像是一个盒子可以将.current中得可变属性给保存起来
4. ref与useRef的区别在于，后者是创建的了一个普通的js对象，useRef和自建一个{current: ..。}对象的唯一区别是，useRef会在每次渲染时，返回同一个ref对象
* useImperativeHandle
1. 作用：可以在使用ref时自定义暴露给赋组件的实例值，使用的形式如下：
```
useImperativeHandle(ref, createHandle, [deps])
```
* useLayoutEffect
1. 更新时机：在浏览器执行下一次绘制前去执行
2. 与useEffect相同，会在所有的DOM变更之后同步调用effect
* useDebugValue
1. 作用：在react devTools中常被用于去当作展示标签，作为客户端的钩子

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
* constructor: 可以通过useState来初始化state
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
* shouldComponentUpdata()，常使用React.memo来代替,在默认情况下，它将对props对象中的复杂对象进行浅层比较，如果想要去控制比较，可以去提供一个自定义的比较函数作为第二个参数。代替hook的方式如下所示
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
## hooks中的性能优化
1. 如何在更新时去跳过effect，可以采用条件式方式，即在useEffect中去传递第二个参数
2. 由于某些原因，无法将一个函数移动到effect内部时，可采用下面方式
    * 尝试将函数移动到当前组件的外部
    * 如果所调用对策方法是一个纯计算等，此时可以在effect外面去写这个函数
    * 如果要增加一个函数去依赖项，那么要明确使用useCallback外部的hook，如下面的例子所示
    ```
    function ProductPage({ productId }) {
    // ✅ Wrap with useCallback to avoid change on every render
    const fetchProduct = useCallback(() => {
        // ... Does something with productId ...
    }, [productId]); // ✅ All useCallback dependencies are specified

    return <ProductDetails fetchProduct={fetchProduct} />;
    }

    function ProductDetails({ fetchProduct }) {
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]); // ✅ All useEffect dependencies are specified
    // ...
    }
    ```
3. 实现shouldComponentUpdate的方式
```
    const Button = React.memo((props) => {
    // your component
    });
```
* 如上面所示，这种实现方式并不是使用了hooks，它相当于纯组件，但是仅仅能够比较的是props。可以去增加第二个参数，采用一种函数的方式去拿到新老的props，如果结果返回true，就跳过更新阶段
4. 记住计算结果的方式
* 使用useMemo这个hook去记住之前的计算结果，从而在多个渲染之中缓存计算
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
* 上面的代码会调用computeExpensiveValue(a,b)这个函数，但是它们依赖的a,b没有改变，那么useMemo在直接去返回上一次结果的值