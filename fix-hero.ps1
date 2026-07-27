$path = "e:\Puskar Bhatt web\puskar-villain-portfolio\src\components\Hero.tsx"
$txt = [System.IO.File]::ReadAllText($path)
$txt = $txt.Replace("BHATT</span>`r`n            </h2>", "BHATT</span>`r`n              </span>`r`n            </h2>")
$txt = $txt.Replace('<span className="relative whitespace-nowrap">Enter the Dark Side</span>`r`n              </Link>', '<span className="relative whitespace-nowrap">Enter the Dark Side</span>`r`n                </span>`r`n              </Link>')
[System.IO.File]::WriteAllText($path, $txt)
Write-Host "Fixed!"
