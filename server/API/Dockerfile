# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["API.csproj", "./"]
RUN dotnet restore "./API.csproj"

# Copy the rest and build
COPY . .
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose the port used in UseUrls("http://0.0.0.0:10000")
EXPOSE 10000

ENTRYPOINT ["dotnet", "API.dll"]
