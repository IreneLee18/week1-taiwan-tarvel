import ClipLoader from "react-spinners/ClipLoader";
const css={
  borderColor:`rgb(166, 205, 224) rgb(166, 205, 224) transparent`,
  position: 'absolute',
  top:'calc(50% - 84.5px)',
  left:'48%',
}
function Loading(){
  return(
    <>
    <div style={{position:'relative',height:'calc(100vh - 80px - 84.5px)'}}>
      <ClipLoader size={100} cssOverride={css}/>
    </div>
    </>
  )
}
export default Loading