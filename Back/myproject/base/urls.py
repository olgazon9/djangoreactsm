from django.urls import path
from .views import ObtainTokenPairView, CustomUserCreate
from .views import CategoryListCreateView, ProductListCreateView, ProductDetailView
from .views import OrderListCreateView

urlpatterns = [
    path('token/', ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/orders/', OrderListCreateView.as_view(), name='order-list-create'),
]
