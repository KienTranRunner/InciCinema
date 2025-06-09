# -------- Stage 1: Build --------
    FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
    WORKDIR /src
    
    # Copy toàn bộ solution và các project con
    COPY . .
    
    # Restore dependencies từ solution
    RUN dotnet restore "server.sln"
    
    # Publish dự án API
    RUN dotnet publish "API/API.csproj" -c Release -o /app/publish
    
    # -------- Stage 2: Runtime --------
    FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS runtime
    WORKDIR /app
    
    # Copy các file đã publish từ stage build
    COPY --from=build /app/publish .
    
    # Expose port đúng với UseUrls("http://0.0.0.0:10000")
    EXPOSE 10000
    
    ENTRYPOINT ["dotnet", "API.dll"]
    