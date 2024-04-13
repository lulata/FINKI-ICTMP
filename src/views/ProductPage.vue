<template>
    <div class="container">
    <h4>Route</h4>
        <div class="container">
            <div class="card flex-row"><img class="card-img-left example-card-img-responsive" src=""/>
                <div class="card-body">
                <h4 class="card-title h3">Product Title</h4>
                <h6>Price $$$</h6>
                <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <div class="container">
                        <div class="row">
                            <span v-for="(size,index) in 5" :key="index" class="col-md-1">
                                <button type="button" class="btn btn-info" >Info</button>
                            </span>
                        </div>
                    </div>
                <button type="button" class="btn btn-primary">Add To Cart</button>
            </div>
            </div>
        </div>
    </div>
    <div class="container">
    <h3>More About the product</h3>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
    <div class="container">
    <h3>Similar products</h3> 
    <div class="row">
            <div v-for="(slikica,index) in 3" :key="index" class="col-md-4">BlahBlah</div>
        </div>
    </div>

</template>
<style lang="scss" scoped> 
h4 {
    padding-top: 20px;

}
h3 {
    padding-top: 20px;
}
.col-md-1{
    margin-left: 130px;
}
</style>
