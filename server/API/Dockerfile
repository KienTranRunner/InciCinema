# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

# Copy toàn bộ source code từ thư mục gốc repo
COPY ../../ . 

# Restore solution
RUN dotnet restore "server.sln"

# Publish dự án API
RUN dotnet publish "API/API.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app
COPY --from=build /app/publish .

# Nếu bạn dùng UseUrls("http://0.0.0.0:10000") trong code
EXPOSE 10000

ENTRYPOINT ["dotnet", "API.dll"]
