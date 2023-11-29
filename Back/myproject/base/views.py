from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .serializers import CustomUserSerializer
from django.contrib.auth.models import User
# products/views.py
from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework import generics
from .models import Order, OrderDetail
from .serializers import OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# views.py
class OrderListCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Assuming you have the order data in request.data and order_details data in detail_data
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()

            # Create OrderDetail instances
            detail_data = request.data.get('order_details', [])
            for detail in detail_data:
                # Extract the product ID from detail
                product_id = detail.pop('product', None)
                
                if product_id:
                    # Ensure product_id is an integer
                    product_id = int(product_id)

                    # Get or create the Product instance
                    product, _ = Product.objects.get_or_create(id=product_id)

                    # Create OrderDetail with the correct Product instance
                    OrderDetail.objects.create(order=order, product=product, **detail)
                else:
                    # Handle the case where product_id is not provided
                    return Response({'error': 'Product ID is required for each order detail.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# views.py
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.request.query_params.get('category', None)
        if category_id:
            return Product.objects.filter(category_id=category_id)
        return Product.objects.all()
    
    class OrderListCreateView(APIView):
     permission_classes = [IsAuthenticated]  # Ensure only authenticated users can place orders

    def post(self, request, *args, **kwargs):
        # Assuming you have the order data in request.data and order_details data in detail_data
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            # Assign the authenticated user to the order
            serializer.validated_data['user'] = request.user
            order = serializer.save()

            # Create OrderDetail instances
            detail_data = request.data.get('order_details', [])
            for detail in detail_data:
                # Extract the product ID from detail
                product_id = detail.pop('product', None)

                if product_id:
                    # Ensure product_id is an integer
                    product_id = int(product_id)

                    # Get or create the Product instance
                    product, _ = Product.objects.get_or_create(id=product_id)

                    # Create OrderDetail with the correct Product instance
                    OrderDetail.objects.create(order=order, product=product, **detail)
                else:
                    # Handle the case where product_id is not provided
                    return Response({'error': 'Product ID is required for each order detail.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ObtainTokenPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = self.get_serializer().validate(self.request.data)
        data = {
            'access': response.data['access'],
            'refresh': str(refresh),
        }
        response.data = data
        return response

class CustomUserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
